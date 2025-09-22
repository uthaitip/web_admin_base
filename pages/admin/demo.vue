<template>
  <div>
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">{{ t('demo.title')}}</h1>
      <BaseButton @click="openModal" variant="primary">{{ t("demo.btn.create") }}</BaseButton>
    </div>

    <div class="grid grid-cols-3 border rounded-lg bg-base-100 border-base-300 p-5 gap-4 mb-6">
      <div><BaseInput v-model="selectDemo.search" type="text" :placeholder="t('demo.placeholderSearch')" :label="t('demo.search')" @input="handleSearch" /></div>
      <div><BaseSelect v-model="selectDemo.basic" :options="selectOptions" :label="t('demo.extension')" :placeholder="t('demo.placeholderExtension')" /></div>
      <div><BaseSelect v-model="selectDemo.status" :options="selectOptionStatus" :label="t('demo.status')" :placeholder="t('demo.placeholderStatus')" @change="filterByStatus" /></div>
    </div>

    <!-- Table  -->
    <div class="rounded-lg overflow-hidden border border-base-300">
      <BaseTable :data="paginationHouseHold ?? []" :columns="optionColumns" :loading="loading" :showEdit="false" :showDelete="false"
        loading-text="Loading roles..." empty-title="No roles found" empty-text="There are no roles to display"
        empty-icon="users" striped >
        <template #houseName="{ row }">
          <div class="flex items-center"> {{  row?.firstName }} {{ row?.lastName }}</div>
        </template>

        <template #status="{ row }">
          <div class="badge" :class="StatusColor[row?.status]">
            {{ StatusText[row?.status] }}
          </div>
          <!-- <div>{{ StatusText[row?.status] }}</div> -->
        </template>

        <template #houseUsage="{ row }">
          <div>{{ row?.houseUsage }}</div>
        </template>

        <template #btn="{ row }">
          <div>
            <BaseButton @click="openModal(row)" variant="ghost" size="sm" icon-left="pencil" title="edit house hold" />
            <BaseButton @click="onDelete(row)" variant="ghost" size="sm" icon-left="trash" title="delete hose hold" class="text-error hover:text-error" />
          </div>
        </template>
      </BaseTable>
      <div>
        <BasePagination 
          :current-page="pagination.page || 1"
          :total-items="pagination.total || 0"
          :per-page="pagination.limit || 10"
          :max-pages="5"
          @change="handlePageChange"
        />
      </div>
    </div>

    <!-- Modal -->

    <BaseModal v-model:visible="isModalVisible" :title="!formData?.id ? t('demo.modalDemo.titleCreate') : t('demo.modalDemo.titleUpdate')" :closeable="false" size="xl3">
     <div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput 
            v-model="formData.firstName" 
            type="text" 
            :label="t('demo.demoForm.fistName')" 
            :placeholder="t('demo.demoForm.placeholderFirstName')" 
            :error="formErrors.firstName"
            required 
          />
          <BaseInput 
            v-model="formData.lastName" 
            type="text" 
            :label="t('demo.demoForm.lastName')" 
            :placeholder="t('demo.demoForm.placeholderLastName')" 
            :error="formErrors.lastName"
            required 
          />
          <BaseInput 
            v-model="formData.houseUsage" 
            type="number" 
            :label="t('demo.demoForm.houseUsage')" 
            :placeholder="t('demo.demoForm.placeholderHouseUsage')" 
            :error="formErrors.houseUsage"
            min="0" 
            max="999999" 
            required 
          />
          <BaseInput 
            v-model="formData.address" 
            type="text" 
            :label="t('demo.demoForm.address')" 
            :placeholder="t('demo.demoForm.placeholderAddress')" 
            :error="formErrors.address"
            min="0" 
            max="999999" 
            required 
          />
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <BaseButton @click="closeModal" variant="secondary">{{ t('demo.demoForm.btnCancel') }}</BaseButton>
          <BaseButton @click="submitForm" variant="primary" :disabled="!isFormValid">{{ t('demo.demoForm.btnOK') }}</BaseButton>
        </div>
     </div>
    </BaseModal>


    <BaseModal v-model:visible="modalConfrimDelete" title="ยืนยัน" size="sm" :closeable="false">
      <p class="text-center">คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้</p>
      <template #actions>
        <div class="flex justify-center items-center gap-2">
          <BaseButton @click="modalConfrimDelete = false">ยกเลิก</BaseButton>
          <BaseButton variant="error" @click="deleteHousehold">ยืนยัน</BaseButton>
        </div>
      </template>
    </BaseModal>

    <BaseAlert v-model:visible="alertDemo.showSuccess" type="success" title="สำเร็จ!"
    :message="titleAlertSuccess" position="top" :duration="3000" />
  </div>

</template>

<script setup>
import { API_ENDPOINTS } from '~/composables/constants/api';
import { useHouseholdStore } from '~/stores/houseHold';
const { t } = useI18n()

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

const StatusColor = {
  [StatusEnum.ACTIVE]: 'badge-success',
  [StatusEnum.INACTIVE]: 'badge-error',
  [StatusEnum.PENDING]: 'badge-warning',
  [StatusEnum.SUSPENDED]: 'badge-info'
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
const dataConfirmDelete = ref(null);
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

const alertDemo = ref({
  showSuccess: false,
  showError: false,
  showWarning: false,
  showInfo: false,
  showConfirm: false,
  confirmResult: ''
})

const titleAlertSuccess = ref('บันทึกข้อมูลเรียบร้อยแล้ว');

const modalConfrimDelete = ref(false);

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
  if(formData?.id) {
    await houseHoldStore.updateHousehold({
      body: formData
    });

    titleAlertSuccess.value = "แก้ไขข้อมูลเรียบร้อยแล้ว";
    alertDemo.value.showSuccess = true;
    await getHouseholdList();
    closeModal();
    
  } else {
    if (validateForm()) {
      try {
        const { post } = useApi();
        await post(API_ENDPOINTS.HOUSEHOLDS.CREATE, formData);
        titleAlertSuccess.value = "บันทึกข้อมูลเรียบร้อยแล้ว";
        alertDemo.value.showSuccess = true;
        await getHouseholdList();
        closeModal();
      } catch (error) {
      }
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
watch(() => houseHolds.value, () => {
  // Handle data changes if needed
}, { deep: true })
const selectOptions = ref([
  {
  label: t('demo.options.option1'),
  value: 'opt1'
  }, 
]);

const selectOptionStatus = ref([
  {
    label: t('demo.statusOptions.all'),
    value: ''
  },
  {
    label: t('demo.statusOptions.active'),
    value: 'active'
  },
  {
    label: t('demo.statusOptions.inactive'),
    value: 'inactive'
  },
  {
    label: t('demo.statusOptions.pending'),
    value: 'pending'
  },
  {
    label: t('demo.statusOptions.suspended'),
    value: 'suspended'
  }
]);

// column table 
const optionColumns = ref([
  {
    key: 'houseCode',
    label: t("demo.column.houseCode"),
  },
  {
    key: 'houseName',
    label: t("demo.column.houseName"),
  },
  {
    key: 'address',
    label: t("demo.column.address"),
  },
  {
    key: 'houseUsage',
    label: t("demo.column.houseUsage"),
  },
  {
    key: 'status',
    label: t("demo.column.status"),
  },
  {
    key: 'btn',
    label: t("demo.column.actions"),
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
   const queryParams = {
     pagination: {
       page: filter.page || pagination.value?.page || 1,
       limit: 10
     },
     filter: {
       ...(filter.status && { status: filter.status })
     },
     ...(filter.search && { search: filter.search })
   }

   await houseHoldStore.getHouseHoldList({
     query: queryParams,
   })

  } catch (error) {
    if (error.status === 401) {
      return
    }
  }
}

const handlePageChange = async (page) => {
  await getHouseholdList({ page });
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
    formData.id = row._id || row.id;
  } else {
    // Create mode - clear form
    isCreateMode.value = true;
    resetForm();
  }
  modalCreateForm.value.showLarge = true;

}

const onDelete = async (row) => {
  modalConfrimDelete.value  = true;
  dataConfirmDelete.value = row;
}

const deleteHousehold = async () => {
  await houseHoldStore.deleteHousehold({id: dataConfirmDelete.value._id || dataConfirmDelete.value.id});
  modalConfrimDelete.value  = false;
  dataConfirmDelete.value = null;
  titleAlertSuccess.value = "ลบข้อมูลสำเร็จ";
  alertDemo.value.showSuccess = true;
  await getHouseholdList();
}

const applyFilters = async () => {
  const filters = {};
  
  if (selectDemo.status) {
    filters.status = selectDemo.status;
  }
  
  if (selectDemo?.search?.trim()) {
    filters.search = selectDemo.search.trim();
  }

  await getHouseholdList(filters);
}

// Individual filter handlers that call the combined function
const filterByStatus = () => applyFilters();
const handleSearch = () => applyFilters();

</script>