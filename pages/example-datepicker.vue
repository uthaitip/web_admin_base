<template>
  <div class="p-6 space-y-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold mb-2">BaseDatePicker Examples</h1> <BaseHeroIcon name="arrow-right-circle" />
      <p class="text-base-content/70">ตัวอย่างการใช้งาน BaseDatePicker component แบบปฏิทินไทย พ.ศ.</p>
    </div>

    <!-- Basic DatePicker Examples -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="calendar-days" size="md" />
          Date Picker พื้นฐาน
        </h2>
        <p class="text-base-content/70 mb-4">เลือกวันที่ แสดงเป็นปฏิทินไทย (พ.ศ.)</p>
        {{ basicDate }}
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BaseDatePicker 
            v-model="basicDate" 
            label="เลือกวันที่" 
            type="date"
            @change="handleDateChange"
          />
          
          <BaseDatePicker 
            v-model="dateWithPlaceholder" 
            label="วันที่กำหนดส่ง" 
            placeholder="กรุณาเลือกวันที่"
            type="date"
            hint="วันที่ที่ต้องการส่งงาน"
          />
          
          <BaseDatePicker 
            v-model="requiredDate" 
            label="วันที่เริ่มงาน" 
            type="date"
            required
            error="กรุณาเลือกวันที่เริ่มงาน"
          />
        </div>
        
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <h3 class="font-semibold mb-2">ค่าที่เลือก:</h3>
          <div class="space-y-1 text-sm font-mono">
            <div><strong>วันที่พื้นฐาน:</strong> {{ formatDisplayDate(basicDate) }}</div>
            <div><strong>วันที่กำหนดส่ง:</strong> {{ formatDisplayDate(dateWithPlaceholder) }}</div>
            <div><strong>วันที่เริ่มงาน:</strong> {{ formatDisplayDate(requiredDate) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Picker Examples -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="clock" size="md" />
          Time Picker
        </h2>
        <p class="text-base-content/70 mb-4">เลือกเวลา (ชั่วโมง:นาที)</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <BaseDatePicker 
            v-model="basicTime" 
            label="เวลาเริ่มงาน" 
            type="time"
          />
          
          <BaseDatePicker 
            v-model="endTime" 
            label="เวลาเลิกงาน" 
            type="time"
            variant="primary"
          />
          
          <BaseDatePicker 
            v-model="breakTime" 
            label="เวลาพักเบรก" 
            type="time"
            variant="secondary"
            hint="เวลาพักกลางวัน"
          />
        </div>
        
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <h3 class="font-semibold mb-2">เวลาที่เลือก:</h3>
          <div class="space-y-1 text-sm font-mono">
            <div><strong>เวลาเริ่มงาน:</strong> {{ formatTime(basicTime) }}</div>
            <div><strong>เวลาเลิกงาน:</strong> {{ formatTime(endTime) }}</div>
            <div><strong>เวลาพักเบรก:</strong> {{ formatTime(breakTime) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- DateTime Picker Examples -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="calendar" size="md" />
          DateTime Picker
        </h2>
        <p class="text-base-content/70 mb-4">เลือกวันที่และเวลาพร้อมกัน</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseDatePicker 
            v-model="meetingDateTime" 
            label="วันที่และเวลานัดหมาย" 
            type="datetime-local"
            variant="success"
          />
          
          <BaseDatePicker 
            v-model="deadlineDateTime" 
            label="วันที่และเวลาส่งงาน" 
            type="datetime-local"
            variant="warning"
            hint="กำหนดส่งโปรเจกต์"
          />
        </div>
        
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <h3 class="font-semibold mb-2">วันที่และเวลาที่เลือก:</h3>
          <div class="space-y-1 text-sm font-mono">
            <div><strong>นัดหมาย:</strong> {{ formatDateTime(meetingDateTime) }}</div>
            <div><strong>กำหนดส่ง:</strong> {{ formatDateTime(deadlineDateTime) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- DatePicker with Min/Max -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="calendar-days" size="md" />
          DatePicker พร้อมข้อจำกัด
        </h2>
        <p class="text-base-content/70 mb-4">กำหนดวันที่ขั้นต่ำและสูงสุดที่เลือกได้</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseDatePicker 
            v-model="futureDate" 
            label="วันที่ในอนาคต (7 วันข้างหน้า)" 
            type="date"
            :min="minFutureDate"
            variant="info"
            hint="เลือกได้เฉพาะวันที่ในอนาคต"
          />
          
          <BaseDatePicker 
            v-model="pastDate" 
            label="วันที่ในอดีต (30 วันที่แล้ว)" 
            type="date"
            :max="maxPastDate"
            variant="accent"
            hint="เลือกได้เฉพาะวันที่ในอดีต"
          />
        </div>
        
        <div class="mt-4 p-4 bg-base-200 rounded-lg">
          <h3 class="font-semibold mb-2">วันที่ที่เลือก:</h3>
          <div class="space-y-1 text-sm font-mono">
            <div><strong>วันที่ในอนาคต:</strong> {{ formatDisplayDate(futureDate) }}</div>
            <div><strong>วันที่ในอดีต:</strong> {{ formatDisplayDate(pastDate) }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Different Sizes -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="adjustments-horizontal" size="md" />
          ขนาดต่างๆ
        </h2>
        <p class="text-base-content/70 mb-4">ตัวอย่างขนาด DatePicker ที่แตกต่างกัน</p>
        
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-semibold mb-2">ขนาด Extra Small (xs)</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BaseDatePicker v-model="sizeExampleDate" label="Date (xs)" type="date" size="xs" />
              <BaseDatePicker v-model="sizeExampleTime" label="Time (xs)" type="time" size="xs" />
              <BaseDatePicker v-model="sizeExampleDateTime" label="DateTime (xs)" type="datetime-local" size="xs" />
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">ขนาด Small (sm)</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BaseDatePicker v-model="sizeExampleDate" label="Date (sm)" type="date" size="sm" />
              <BaseDatePicker v-model="sizeExampleTime" label="Time (sm)" type="time" size="sm" />
              <BaseDatePicker v-model="sizeExampleDateTime" label="DateTime (sm)" type="datetime-local" size="sm" />
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-semibold mb-2">ขนาด Large (lg)</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BaseDatePicker v-model="sizeExampleDate" label="Date (lg)" type="date" size="lg" />
              <BaseDatePicker v-model="sizeExampleTime" label="Time (lg)" type="time" size="lg" />
              <BaseDatePicker v-model="sizeExampleDateTime" label="DateTime (lg)" type="datetime-local" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Example -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="document-text" size="md" />
          ตัวอย่างการใช้ในฟอร์ม
        </h2>
        <p class="text-base-content/70 mb-4">ตัวอย่างการใช้ DatePicker ในฟอร์มจริง</p>
        
        <form @submit.prevent="submitForm" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput 
              v-model="formData.name" 
              label="ชื่อ-นามสกุล" 
              required 
            />
            
            <BaseInput 
              v-model="formData.email" 
              label="อีเมล" 
              type="email" 
              required 
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseDatePicker 
              v-model="formData.birthDate" 
              label="วันเกิด" 
              type="date"
              :max="maxBirthDate"
              required
            />
            
            <BaseDatePicker 
              v-model="formData.startDate" 
              label="วันเริ่มงาน" 
              type="date"
              :min="today"
              required
            />
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseDatePicker 
              v-model="formData.workTime" 
              label="เวลาเริ่มงาน" 
              type="time"
              required
            />
            
            <BaseDatePicker 
              v-model="formData.meetingDateTime" 
              label="วันที่นัดสัมภาษณ์" 
              type="datetime-local"
              :min="today"
            />
          </div>
          
          <div class="flex gap-4">
            <BaseButton type="submit" variant="primary">
              บันทึกข้อมูล
            </BaseButton>
            <BaseButton type="button" variant="ghost" @click="resetForm">
              รีเซ็ต
            </BaseButton>
          </div>
        </form>
        
        <div v-if="formSubmitted" class="mt-4 p-4 bg-success/10 border border-success rounded-lg">
          <h3 class="font-semibold text-success mb-2">ข้อมูลที่ส่ง:</h3>
          <pre class="text-sm font-mono text-success">{{ JSON.stringify(formData, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- API Integration Example -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="code-bracket" size="md" />
          Code Examples
        </h2>
        <p class="text-base-content/70 mb-4">ตัวอย่าง code การใช้งาน</p>
        
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold mb-2">Basic Date Picker</h3>
            <div class="mockup-code text-sm">
              <pre data-prefix="1"><code>&lt;BaseDatePicker</code></pre>
              <pre data-prefix="2"><code>  v-model="date"</code></pre>
              <pre data-prefix="3"><code>  label="เลือกวันที่"</code></pre>
              <pre data-prefix="4"><code>  type="date"</code></pre>
              <pre data-prefix="5"><code>  @change="handleDateChange"</code></pre>
              <pre data-prefix="6"><code>/&gt;</code></pre>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold mb-2">DateTime Picker with Validation</h3>
            <div class="mockup-code text-sm">
              <pre data-prefix="1"><code>&lt;BaseDatePicker</code></pre>
              <pre data-prefix="2"><code>  v-model="meetingDateTime"</code></pre>
              <pre data-prefix="3"><code>  label="วันที่นัดหมาย"</code></pre>
              <pre data-prefix="4"><code>  type="datetime-local"</code></pre>
              <pre data-prefix="5"><code>  :min="today"</code></pre>
              <pre data-prefix="6"><code>  variant="primary"</code></pre>
              <pre data-prefix="7"><code>  required</code></pre>
              <pre data-prefix="8"><code>/&gt;</code></pre>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold mb-2">Time Picker</h3>
            <div class="mockup-code text-sm">
              <pre data-prefix="1"><code>&lt;BaseDatePicker</code></pre>
              <pre data-prefix="2"><code>  v-model="workTime"</code></pre>
              <pre data-prefix="3"><code>  label="เวลาทำงาน"</code></pre>
              <pre data-prefix="4"><code>  type="time"</code></pre>
              <pre data-prefix="5"><code>  size="lg"</code></pre>
              <pre data-prefix="6"><code>/&gt;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Basic date examples
const basicDate = ref(new Date())
const dateWithPlaceholder = ref(null)
const requiredDate = ref(null)

// Time examples
const basicTime = ref({ hours: 9, minutes: 0 })
const endTime = ref({ hours: 17, minutes: 30 })
const breakTime = ref({ hours: 12, minutes: 0 })

// DateTime examples
const meetingDateTime = ref(new Date())
const deadlineDateTime = ref(null)

// Min/Max examples
const futureDate = ref(null)
const pastDate = ref(null)

// Size examples
const sizeExampleDate = ref(new Date())
const sizeExampleTime = ref({ hours: 10, minutes: 30 })
const sizeExampleDateTime = ref(new Date())

// Form example
const formData = ref({
  name: '',
  email: '',
  birthDate: null,
  startDate: null,
  workTime: null,
  meetingDateTime: null
})

const formSubmitted = ref(false)

// Computed values for min/max dates
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const minFutureDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString().split('T')[0]
})

const maxPastDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() - 30)
  return date.toISOString().split('T')[0]
})

const maxBirthDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 18)
  return date.toISOString().split('T')[0]
})

// Helper functions
const formatDisplayDate = (date: any) => {
  if (!date) return 'ไม่ได้เลือก'
  
  if (date instanceof Date) {
    const buddhistYear = date.getFullYear() + 543
    const month = date.toLocaleDateString('th-TH', { month: 'long' })
    const day = date.getDate()
    return `${day} ${month} ${buddhistYear}`
  }
  
  return String(date)
}

const formatTime = (time: any) => {
  if (!time) return 'ไม่ได้เลือก'
  
  if (typeof time === 'object' && time.hours !== undefined) {
    const hours = String(time.hours).padStart(2, '0')
    const minutes = String(time.minutes || 0).padStart(2, '0')
    return `${hours}:${minutes} น.`
  }
  
  return String(time)
}

const formatDateTime = (dateTime: any) => {
  if (!dateTime) return 'ไม่ได้เลือก'
  
  if (dateTime instanceof Date) {
    const buddhistYear = dateTime.getFullYear() + 543
    const month = dateTime.toLocaleDateString('th-TH', { month: 'long' })
    const day = dateTime.getDate()
    const hours = String(dateTime.getHours()).padStart(2, '0')
    const minutes = String(dateTime.getMinutes()).padStart(2, '0')
    return `${day} ${month} ${buddhistYear} เวลา ${hours}:${minutes} น.`
  }
  
  return String(dateTime)
}

// Event handlers
const handleDateChange = (value: any) => {
  console.log('Date changed (should be yyyy-mm-dd):', value)
  console.log('Type:', typeof value)
  console.log('From @change event - not Event object anymore!')
}

const submitForm = () => {
  console.log('Form submitted:', formData.value)
  formSubmitted.value = true
  
  // Hide success message after 3 seconds
  setTimeout(() => {
    formSubmitted.value = false
  }, 3000)
}

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    birthDate: null,
    startDate: null,
    workTime: null,
    meetingDateTime: null
  }
  formSubmitted.value = false
}
</script>