<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Demo Page</h1>
      <BaseButton @click="openModal" variant="primary">เพิ่มรายการ</BaseButton>
    </div>

    <div class="grid grid-cols-3 border rounded-lg bg-white p-5 gap-4">
      <div><BaseInput v-model="selectDemo.search" type="text" placeholder="ค้นหาครัวเรือน" label="ค้นหา" @input="handleSearch" /></div>
      <div><BaseSelect v-model="selectDemo.basic" :options="selectOptions" label="กรองตามพื้นที่" /></div>
      <div><BaseSelect v-model="selectDemo.status" :options="selectOptionStatus" label="สถานะ" @change="filterByStatus" /></div>
    </div>

    <!-- Table  -->
    <div class="rounded-lg overflow-hidden">
      <BaseTable :data="paginationHouseHold ?? []" :columns="optionColumns" :showEdit="false" :showDelete="false"
        loading-text="Loading roles..." empty-title="No roles found" empty-text="There are no roles to display"
        empty-icon="users" striped >
        <template #houseName="{ row }">
          <div class="flex items-center"> {{  row?.firstName }} {{ row?.lastName }}</div>
        </template>

        <template #status="{ row }">
          <div>{{ StatusText[row?.status] }}</div>
        </template>

        <template #houseUsage="{ row }">
          <div>{{ row?.houseUsage }}</div>
        </template>

        <template #btn="{ row }">
          <div>
            <BaseButton variant="link" size="sm" @click="openModal(row)">แก้ไข</BaseButton>
            <BaseButton variant="link" size="sm" @click="onDelete(row)">ลบ</BaseButton>
          </div>
        </template>
      </BaseTable>
      <div>
        <BasePagination 
          :current-page="pagination.page || 1"
          :total-items="pagination.total || 0"
          :per-page="pagination.limit || 10"
          :max-pages="5"
        />
      </div>
    </div>

    <!-- Modal -->

    <BaseModal v-model:visible="isModalVisible" title="เพิ่มรายการ" size="xl3">
     <div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput 
            v-model="formData.firstName" 
            type="text" 
            label="ชื่อ" 
            placeholder="กรุณากรอกชื่อ..." 
            :error="formErrors.firstName"
            required 
          />
          <BaseInput 
            v-model="formData.lastName" 
            type="text" 
            label="นามสกุล" 
            placeholder="กรุณากรอกนามสกุล..." 
            :error="formErrors.lastName"
            required 
          />
          <BaseInput 
            v-model="formData.houseUsage" 
            type="number" 
            label="การใช้ไฟ (หน่วย)" 
            placeholder="กรุณากรอกจำนวน..." 
            :error="formErrors.houseUsage"
            min="0" 
            max="999999" 
            required 
          />
          <BaseInput 
            v-model="formData.address" 
            type="text" 
            label="ที่อยู่" 
            placeholder="กรุณากรอกที่อยู่" 
            :error="formErrors.address"
            min="0" 
            max="999999" 
            required 
          />
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <BaseButton @click="closeModal" variant="secondary">ยกเลิก</BaseButton>
          <BaseButton @click="submitForm" variant="primary" :disabled="!isFormValid">บันทึก</BaseButton>
        </div>
     </div>
    </BaseModal>


  </div>

</template>

<script setup>
import { API_ENDPOINTS } from '~/composables/constants/api';
import { useHouseholdStore } from '~/stores/houseHold';

// store 
const houseHoldStore = useHouseholdStore();

// computed store getters
const loading = computed(() => houseHoldStore.isLoading);
const houseHolds = computed(() => houseHoldStore.list || []);
const pagination = computed(() => houseHoldStore.pagination || {});
// Initialize
 onMounted(async () => {
  await getHouseholdList();
})

// computed 
const paginationHouseHold = computed(() => {
  return houseHolds.value
})

// Status enum definition
const StatusEnum = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended'
}

// Status text mappings
const StatusText = {
  [StatusEnum.ACTIVE]: 'ใช้งาน',
  [StatusEnum.INACTIVE]: 'ไม่ใช้งาน',
  [StatusEnum.PENDING]: 'รอดำเนินการ',
  [StatusEnum.SUSPENDED]: 'ระงับการใช้งาน'
}


//Reactive data
// modal create form 
const isCreateMode= ref(true);
// option selection status and filter
const modalCreateForm = ref({
  basic: false,
  form: false,
  small: false,
  large: false,
  force: false,
  showBasic: false,
  showLarge: false,
  showWithActions: false,
});

// Computed property for modal visibility (better performance)
const isModalVisible = computed({
  get: () => modalCreateForm.value.showLarge,
  set: (value) => {
    modalCreateForm.value.showLarge = value;
  }
});

// data form 
const formData = reactive({
  firstName: '',
  lastName: '',
  address: '',
  houseUsage: '',
  isActive: 1, 
  status: 'active'
})

// Form validation errors
const formErrors = reactive({
  firstName: '',
  lastName: '',
  houseUsage: '',
  address: ''
})

// Validation rules
const validateForm = () => {
  formErrors.firstName = '';
  formErrors.lastName = '';
  formErrors.houseUsage = '';
  formErrors.address = '';
  
  let isValid = true;
  
  // Validate firstName
  if (!formData.firstName.trim()) {
    formErrors.firstName = 'กรุณากรอกชื่อ';
    isValid = false;
  } else if (formData.firstName.trim().length < 2) {
    formErrors.firstName = 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร';
    isValid = false;
  }

  // Validate address
  if(!formData.address.trim()) {
    formErrors.address = 'กรุณากรอกที่อยู่';
    isValid = false;
  }else if (formData.address.trim().length < 2) {
    formErrors.address = 'ที่อยู่ต้องมีอย่างน้อย 10 ตัวอักษร';
    isValid = false;
  }
  
  // Validate lastName
  if (!formData.lastName.trim()) {
    formErrors.lastName = 'กรุณากรอกนามสกุล';
    isValid = false;
  } else if (formData.lastName.trim().length < 2) {
    formErrors.lastName = 'นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร';
    isValid = false;
  }
  
  // Validate houseUsage
  if (!formData.houseUsage) {
    formErrors.houseUsage = 'กรุณากรอกการใช้ไฟ';
    isValid = false;
  } else if (formData.houseUsage < 0) {
    formErrors.houseUsage = 'การใช้ไฟต้องมากกว่าหรือเท่ากับ 0';
    isValid = false;
  } else if (formData.houseUsage > 999999) {
    formErrors.houseUsage = 'การใช้ไฟต้องไม่เกิน 999,999 หน่วย';
    isValid = false;
  }
  
  return isValid;
}

// Computed property for form validity
const isFormValid = computed(() => {
  return (formData.firstName || '').trim().length >= 2 && 
         (formData.lastName || '').trim().length >= 2 && 
         (formData.address || '').trim().length >= 10 && 
         formData.houseUsage && 
         formData.houseUsage >= 0 && 
         formData.houseUsage <= 999999;
})

// Form methods
const closeModal = () => {
  modalCreateForm.value.showLarge = false;
  resetForm();
}

const resetForm = () => {
  formData.firstName = '';
  formData.lastName = '';
  formData.address = '';
  formData.houseUsage = '';
  formErrors.firstName = '';
  formErrors.lastName = '';
  formErrors.address = '';
  formErrors.houseUsage = '';
}


const submitForm = async () => {
  if (validateForm()) {
    try {
      const { post } = useApi();
      await post(API_ENDPOINTS.HOUSEHOLDS.CREATE, formData);
      
      // Refresh data after successful creation
      await getHouseholdList();
      
      closeModal();
    } catch (error) {
      console.error('Error creating household:', error);
    }
  }
}

// Watch for real-time validation
watch(() => formData.firstName, () => {
  if (formErrors.firstName && formData.firstName.trim().length >= 2) {
    formErrors.firstName = '';
  }
})

watch(() => formData.lastName, () => {
  if (formErrors.lastName && formData.lastName.trim().length >= 2) {
    formErrors.lastName = '';
  }
})

watch(() => formData.houseUsage, () => {
  if (formErrors.houseUsage && formData.houseUsage >= 0 && formData.houseUsage <= 999999) {
    formErrors.houseUsage = '';
  }
})

// Watch for data changes from store
watch(() => houseHolds.value, (newData) => {
  console.log('Store data updated:', newData);
}, { deep: true })
const selectOptions = ref([
  {
  label: 'Option 1',
  value: 'opt1'
  }, 
]);

const selectOptionStatus = ref([
  {
    label: 'ทั้งหมด',
    value: ''
  },
  {
    label: 'ใช้งาน',
    value: 'active'
  },
  {
    label: 'ไม่ใช้งาน',
    value: 'inactive'
  },
  {
    label: 'รอดำเนินการ',
    value: 'pending'
  },
  {
    label: 'ระงับการใช้งาน',
    value: 'suspended'
  }
]);

// column table 
const optionColumns = ref([
  {
    key: 'houseCode',
    label: 'รหัสครัวเรือน',
  },
  {
    key: 'houseName',
    label: 'ชื่อเจ้าของ',
  },
  {
    key: 'address',
    label: 'ที่อยู่',
  },
  {
    key: 'houseUsage',
    label: 'การใช้ไฟ',
  },
  {
    key: 'status',
    label: 'สถานะ',
  },
  {
    key: 'btn',
    label: 'จัดการ',
  },
])
const selectDemo = reactive({
  basic: '',
  status: '',
  search: ''
})



// methods

// call api get hosehold
const getHouseholdList = async (filter = {}) => {
  try {
   // Structure queryParams with nested objects
   const queryParams = {
     pagination: {
       page: 1,
       limit: 10
     },
     filter: {
       ...(filter.status && { status: filter.status })
     },
     ...(filter.search && { search: filter.search })
   }

   console.log('Sending query params to store:', queryParams);

   await houseHoldStore.getHouseHoldList({
     query: queryParams,
   })

  } catch (error) {
       console.error('Error', error)
    if (error.status === 401) {
      console.warn('get household fail')
      
      return
    }
  }
}

const openModal = (row = null) => {
  if (row) {
    // Edit mode - populate form with row data
    isCreateMode.value = false;
    formData.firstName = row.firstName;
    formData.lastName = row.lastName;
    formData.address = row.address;
    formData.houseUsage = row.houseUsage;
    formData.isActive = row.isActive;
    formData.status = row.status;
  } else {
    // Create mode - clear form
    isCreateMode.value = true;
    resetForm();
  }
  modalCreateForm.value.showLarge = true;

}

const onDelete = async (row) => {
  console.log('row =======> ', row);
  await houseHoldStore.deleteHousehold(row.id)
}


// Combined filter function that handles both status and search
const applyFilters = async () => {
  const filters = {};
  
  if (selectDemo.status) {
    filters.status = selectDemo.status;
  }
  
  console.log('selectDemo = ', selectDemo);
  if (selectDemo?.search?.trim()) {
    filters.search = selectDemo.search.trim();
  }

  console.log('Applying filters:', filters);
  
  await getHouseholdList(filters);
}

// Individual filter handlers that call the combined function
const filterByStatus = () => applyFilters();
const handleSearch = () => applyFilters();
</script>