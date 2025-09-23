<template>
  <div class="p-6 space-y-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-2">BaseTable Examples</h1>
      <p class="text-base-content/70">ตัวอย่างการใช้งาน BaseTable component</p>
    </div>

    <!-- Example 1: Basic Table without Pagination -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="table-cells" size="md" />
          ตารางแบบไม่มี Pagination
        </h2>
        <p class="text-base-content/70 mb-4">แสดงข้อมูลทั้งหมดในตารางเดียว</p>
        
        <BaseTable 
          :data="basicUsers" 
          :columns="basicColumns"
          :striped="true"
          :hoverable="true"
          @edit="handleEdit"
          @delete="handleDelete"
          @rowClick="handleRowClick"
          :clickableRows="true"
        />
      </div>
    </div>

    <!-- Example 2: Table with Pagination -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="document-duplicate" size="md" />
          ตารางแบบมี Pagination
        </h2>
        <p class="text-base-content/70 mb-4">แสดงข้อมูลแบบแบ่งหน้า เหมาะสำหรับข้อมูลจำนวนมาก</p>
        
        <div class="flex gap-4 mb-4">
          <BaseButton 
            @click="refreshPaginatedData" 
            variant="primary" 
            icon-left="arrow-path"
            :loading="loading"
          >
            รีเฟรชข้อมูล
          </BaseButton>
          <div class="flex items-center gap-2">
            <span class="text-sm">รายการต่อหน้า:</span>
            <BaseSelect 
              v-model="pageSize" 
              :options="pageSizeOptions" 
              size="sm"
              class="w-24"
              @change="handlePageSizeChange"
            />
          </div>
        </div>
        
        <BaseTable 
          :columns="paginatedColumns"
          :dataPage="paginatedData"
          :loading="loading"
          @pageChange="handlePageChange"
          @pageSizeChange="handlePageSizeChange"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </div>

    <!-- Example 3: Table with Custom Slots -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="sparkles" size="md" />
          ตารางแบบ Custom Slots
        </h2>
        <p class="text-base-content/70 mb-4">การใช้ custom slots สำหรับแสดงข้อมูลแบบกำหนดเอง</p>
        
        <BaseTable 
          :data="customUsers" 
          :columns="customColumns"
          :striped="true"
        >
          <!-- Custom slot สำหรับ status -->
          <template #status="{ row, value }">
            <div class="badge" :class="{
              'badge-success': value === 'active',
              'badge-warning': value === 'pending', 
              'badge-error': value === 'inactive'
            }">
              <BaseIcon 
                :name="getStatusIcon(value)" 
                size="xs" 
                class="mr-1"
              />
              {{ getStatusText(value) }}
            </div>
          </template>
          
          <!-- Custom slot สำหรับ role -->
          <template #role="{ row, value }">
            <div class="badge" :class="{
              'badge-primary': value === 'admin',
              'badge-secondary': value === 'editor', 
              'badge-ghost': value === 'user'
            }">
              {{ getRoleText(value) }}
            </div>
          </template>
          
          <!-- Custom slot สำหรับ avatar -->
          <template #avatar="{ row }">
            <div class="avatar">
              <div class="w-8 h-8 rounded-full">
                <img :src="row.avatar" :alt="row.name" />
              </div>
            </div>
          </template>
          
          <!-- Custom slot สำหรับ actions -->
          <template #actions="{ row }">
            <div class="flex gap-1">
              <BaseButton 
                size="sm" 
                variant="ghost"
                icon-left="eye"
                @click="viewProfile(row)"
                title="ดูโปรไฟล์"
              />
              <BaseButton 
                size="sm" 
                variant="ghost"
                icon-left="key"
                @click="resetPassword(row)"
                title="รีเซ็ตรหัสผ่าน"
              />
              <BaseButton 
                size="sm" 
                variant="ghost"
                icon-left="cog-6-tooth"
                @click="editSettings(row)"
                title="ตั้งค่า"
              />
            </div>
          </template>
        </BaseTable>
      </div>
    </div>

    <!-- Example 4: Different Table Sizes -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="adjustments-horizontal" size="md" />
          ขนาดตารางต่างๆ
        </h2>
        <p class="text-base-content/70 mb-4">ตัวอย่างขนาดตารางที่แตกต่างกัน</p>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">ขนาด Extra Small (xs)</h3>
            <BaseTable 
              :data="sizeExampleData" 
              :columns="sizeColumns"
              size="xs"
              :compact="true"
            />
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">ขนาด Small (sm)</h3>
            <BaseTable 
              :data="sizeExampleData" 
              :columns="sizeColumns"
              size="sm"
            />
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">ขนาด Large (lg)</h3>
            <BaseTable 
              :data="sizeExampleData" 
              :columns="sizeColumns"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  title: 'BaseTable Examples',
  description: 'ตัวอย่างการใช้งาน BaseTable component'
})

// Basic Table Data
const basicUsers = ref([
  { id: 1, name: 'สมชาย ใจดี', email: 'somchai@email.com', role: 'admin' },
  { id: 2, name: 'สมหญิง รักสนุก', email: 'somying@email.com', role: 'user' },
  { id: 3, name: 'สมศักดิ์ มีเงิน', email: 'somsak@email.com', role: 'editor' },
  { id: 4, name: 'สมพงษ์ แซ่ลี', email: 'sompong@email.com', role: 'user' },
  { id: 5, name: 'สมใจ ดีใจ', email: 'somjai@email.com', role: 'admin' }
])

const basicColumns = [
  { key: 'id', label: 'ID', sortable: true, width: '20' },
  { key: 'name', label: 'ชื่อ-นามสกุล', sortable: true },
  { key: 'email', label: 'อีเมล' },
  { key: 'role', label: 'บทบาท' }
]

// Paginated Table Data
const allPaginatedUsers = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(5)
const loading = ref(false)

const pageSizeOptions = [
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 }
]

const paginatedColumns = [
  { key: 'id', label: 'ID', sortable: true, width: '20' },
  { key: 'name', label: 'ชื่อ', sortable: true },
  { key: 'email', label: 'อีเมล' },
  { key: 'department', label: 'แผนก' },
  { key: 'position', label: 'ตำแหน่ง' }
]

// Generate sample data for pagination
const generatePaginatedUsers = () => {
  const departments = ['การเงิน', 'การตลาด', 'IT', 'HR', 'ผลิต']
  const positions = ['หัวหน้าแผนก', 'ผู้ช่วย', 'นักวิเคราะห์', 'ผู้จัดการ', 'เจ้าหน้าที่']
  
  const users = []
  for (let i = 1; i <= 47; i++) {
    users.push({
      id: i,
      name: `ผู้ใช้ ${i}`,
      email: `user${i}@company.com`,
      department: departments[Math.floor(Math.random() * departments.length)],
      position: positions[Math.floor(Math.random() * positions.length)]
    })
  }
  return users
}

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  const data = allPaginatedUsers.value.slice(start, end)
  
  return {
    data: data,
    currentPage: currentPage.value,
    totalPages: Math.ceil(allPaginatedUsers.value.length / pageSize.value),
    totalItems: allPaginatedUsers.value.length,
    pageSize: pageSize.value
  }
})

// Custom Slots Table Data
const customUsers = ref([
  { 
    id: 1, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    name: 'สมชาย ใจดี', 
    email: 'somchai@email.com', 
    role: 'admin',
    status: 'active'
  },
  { 
    id: 2, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    name: 'สมหญิง รักสนุก', 
    email: 'somying@email.com', 
    role: 'user',
    status: 'pending'
  },
  { 
    id: 3, 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3',
    name: 'สมศักดิ์ มีเงิน', 
    email: 'somsak@email.com', 
    role: 'editor',
    status: 'inactive'
  }
])

const customColumns = [
  { key: 'avatar', label: 'รูป', width: '20' },
  { key: 'name', label: 'ชื่อ', sortable: true },
  { key: 'email', label: 'อีเมล' },
  { key: 'role', label: 'บทบาท' },
  { key: 'status', label: 'สถานะ' }
]

// Size Example Data
const sizeExampleData = ref([
  { id: 1, name: 'รายการ 1', value: '100' },
  { id: 2, name: 'รายการ 2', value: '200' },
  { id: 3, name: 'รายการ 3', value: '300' }
])

const sizeColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'ชื่อ' },
  { key: 'value', label: 'ค่า' }
]

// Methods
const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handlePageSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

const refreshPaginatedData = async () => {
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  allPaginatedUsers.value = generatePaginatedUsers()
  loading.value = false
}

const handleEdit = (row: any, index: number) => {
  alert(`แก้ไข: ${row.name}`)
}

const handleDelete = (row: any, index: number) => {
  if (confirm(`ต้องการลบ ${row.name} หรือไม่?`)) {
    // Remove from basic users if exists
    const basicIndex = basicUsers.value.findIndex(u => u.id === row.id)
    if (basicIndex !== -1) {
      basicUsers.value.splice(basicIndex, 1)
    }
    
    // Remove from custom users if exists
    const customIndex = customUsers.value.findIndex(u => u.id === row.id)
    if (customIndex !== -1) {
      customUsers.value.splice(customIndex, 1)
    }
  }
}

const handleRowClick = (row: any, index: number) => {
  console.log('Row clicked:', row)
}

const viewProfile = (row: any) => {
  alert(`ดูโปรไฟล์: ${row.name}`)
}

const resetPassword = (row: any) => {
  alert(`รีเซ็ตรหัสผ่าน: ${row.name}`)
}

const editSettings = (row: any) => {
  alert(`ตั้งค่า: ${row.name}`)
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active': return 'check-circle'
    case 'pending': return 'clock'
    case 'inactive': return 'x-circle'
    default: return 'question-mark-circle'
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'ใช้งาน'
    case 'pending': return 'รอดำเนินการ'
    case 'inactive': return 'ไม่ใช้งาน'
    default: return 'ไม่ทราบ'
  }
}

const getRoleText = (role: string) => {
  switch (role) {
    case 'admin': return 'ผู้ดูแลระบบ'
    case 'editor': return 'บรรณาธิการ'
    case 'user': return 'ผู้ใช้'
    default: return role
  }
}

onMounted(() => {
  allPaginatedUsers.value = generatePaginatedUsers()
})
</script>