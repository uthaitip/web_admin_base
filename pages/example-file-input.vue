<template>
  <div class="container mx-auto py-8 space-y-8">
    <!-- Page Header -->
    <div class="text-center space-y-2">
      <h1 class="text-4xl font-bold">BaseFileInput Examples</h1>
      <p class="text-base-content/70">ตัวอย่างการใช้งาน BaseFileInput component</p>
    </div>

    <!-- Basic Usage -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">การใช้งานพื้นฐาน</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <BaseFileInput 
              v-model="files.single" 
              label="อัปโหลดไฟล์เดี่ยว" 
              hint="เลือกไฟล์หนึ่งไฟล์"
              @change="handleSingleFileChange"
              @file-removed="handleFileRemoved"
            />
            
            <BaseFileInput 
              v-model="files.multiple" 
              label="อัปโหลดหลายไฟล์" 
              multiple
              hint="เลือกได้หลายไฟล์ พร้อมปุ่มลบ"
              @change="handleMultipleFileChange"
              @file-removed="handleFileRemoved"
            />
          </div>
          
          <div class="space-y-4">
            <BaseFileInput 
              v-model="files.images" 
              label="อัปโหลดรูปภาพ" 
              accept="image/*"
              hint="รองรับเฉพาะไฟล์รูปภาพ"
            />
            
            <BaseFileInput 
              v-model="files.documents" 
              label="อัปโหลดเอกสาร" 
              accept=".pdf,.doc,.docx,.txt"
              hint="รองรับ PDF, Word, Text เท่านั้น"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Variants -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">รูปแบบและขนาดต่างๆ</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <BaseFileInput 
              v-model="files.primary" 
              label="Primary Variant" 
              variant="primary"
              size="sm"
            />
            
            <BaseFileInput 
              v-model="files.success" 
              label="Success Variant" 
              variant="success"
            />
            
            <BaseFileInput 
              v-model="files.warning" 
              label="Warning Variant" 
              variant="warning"
              size="lg"
            />
          </div>
          
          <div class="space-y-4">
            <BaseFileInput 
              v-model="files.error" 
              label="Error Variant" 
              variant="error"
              error="กรุณาเลือกไฟล์ที่ถูกต้อง"
            />
            
            <BaseFileInput 
              v-model="files.required" 
              label="Required Field" 
              required
              hint="ฟิลด์นี้จำเป็นต้องกรอก"
            />
            
            <BaseFileInput 
              v-model="files.disabled" 
              label="Disabled State" 
              disabled
              hint="ไม่สามารถเลือกไฟล์ได้"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- File Display -->
    <div v-if="selectedFiles.length > 0" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="document-text" size="md" />
          ไฟล์ที่เลือก ({{ selectedFiles.length }} ไฟล์)
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="(file, index) in selectedFiles" 
            :key="index"
            class="card bg-base-200 shadow-sm"
          >
            <div class="card-body p-4">
              <div class="flex items-start gap-3">
                <BaseIcon 
                  :name="getFileIcon(file)" 
                  size="lg" 
                  :class="getFileIconColor(file)"
                />
                <div class="flex-1 min-w-0">
                  <h3 class="font-medium text-sm truncate" :title="file.name">
                    {{ file.name }}
                  </h3>
                  <div class="text-xs text-base-content/60 space-y-1">
                    <p>ขนาด: {{ formatFileSize(file.size) }}</p>
                    <p v-if="file.type">ประเภท: {{ file.type }}</p>
                    <p>แก้ไขล่าสุด: {{ formatDate(file.lastModified) }}</p>
                  </div>
                </div>
              </div>
              
              <div class="card-actions justify-end mt-3">
                <button 
                  class="btn btn-ghost btn-xs text-error"
                  @click="removeFile(index)"
                >
                  <BaseIcon name="trash" size="xs" />
                  ลบ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Example -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">ตัวอย่างขั้นสูง</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput 
              v-model="form.title" 
              label="ชื่อเอกสาร" 
              required
              placeholder="ระบุชื่อเอกสาร"
            />
            
            <BaseSelect 
              v-model="form.category" 
              label="หมวดหมู่" 
              required
              :options="categoryOptions"
            />
          </div>
          
          <BaseTextarea 
            v-model="form.description" 
            label="รายละเอียด"
            placeholder="ระบุรายละเอียดเพิ่มเติม"
            :rows="3"
          />
          
          <BaseFileInput 
            v-model="form.files" 
            label="ไฟล์แนบ" 
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            required
            hint="รองรับ PDF, Word, และรูปภาพ (สูงสุด 10 ไฟล์)"
            @change="handleFormFileChange"
          />
          
          <div class="card-actions justify-end">
            <BaseButton 
              type="button" 
              variant="ghost"
              @click="resetForm"
            >
              รีเซ็ต
            </BaseButton>
            <BaseButton 
              type="submit" 
              variant="primary"
              :loading="isSubmitting"
            >
              บันทึกข้อมูล
            </BaseButton>
          </div>
        </form>
      </div>
    </div>

    <!-- Code Examples -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title flex items-center gap-2">
          <BaseIcon name="code-bracket" size="md" />
          ตัวอย่าง Code
        </h2>
        <div class="space-y-4">
          <div>
            <h3 class="font-semibold mb-2">การใช้งานพื้นฐาน</h3>
            <div class="mockup-code text-sm">
              <pre data-prefix="1"><code>&lt;BaseFileInput v-model="files" label="Upload File" /&gt;</code></pre>
              <pre data-prefix="2"><code>&lt;BaseFileInput v-model="images" accept="image/*" multiple /&gt;</code></pre>
              <pre data-prefix="3"><code>&lt;BaseFileInput accept=".pdf,.doc" variant="primary" required /&gt;</code></pre>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold mb-2">Event Handling</h3>
            <div class="mockup-code text-sm">
              <pre data-prefix="1"><code>&lt;BaseFileInput @change="handleFileChange" /&gt;</code></pre>
              <pre data-prefix="2"><code>&lt;BaseFileInput @file-removed="handleFileRemoved" /&gt;</code></pre>
              <pre data-prefix="3"><code>&lt;BaseFileInput @focus="onFocus" @blur="onBlur" /&gt;</code></pre>
              <pre data-prefix="4"><code>&lt;BaseFileInput @validate="onValidate" /&gt;</code></pre>
            </div>
          </div>
          
          <div>
            <h3 class="font-semibold mb-2">JavaScript</h3>
            <div class="mockup-code text-sm">
              <pre data-prefix="1"><code>const files = ref(null)</code></pre>
              <pre data-prefix="2"><code>const handleFileChange = (fileList) => {</code></pre>
              <pre data-prefix="3"><code>  console.log('Selected files:', fileList)</code></pre>
              <pre data-prefix="4"><code>}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  title: 'BaseFileInput Examples',
  description: 'ตัวอย่างการใช้งาน BaseFileInput component'
})

// File storage
const files = ref({
  single: null,
  multiple: null,
  images: null,
  documents: null,
  primary: null,
  success: null,
  warning: null,
  error: null,
  required: null,
  disabled: null
})

// Combined selected files for display
const selectedFiles = ref([])

// Form data
const form = ref({
  title: '',
  category: null,
  description: '',
  files: null
})

const isSubmitting = ref(false)

// Category options
const categoryOptions = [
  { label: 'เอกสารทั่วไป', value: 'general' },
  { label: 'รูปภาพ', value: 'image' },
  { label: 'วิดีโอ', value: 'video' },
  { label: 'เสียง', value: 'audio' },
  { label: 'อื่นๆ', value: 'other' }
]

// Event handlers
const handleSingleFileChange = (fileList) => {
  console.log('Single file selected:', fileList)
  if (fileList && fileList.length > 0) {
    updateSelectedFiles()
  }
}

const handleMultipleFileChange = (fileList) => {
  console.log('Multiple files selected:', fileList)
  updateSelectedFiles()
}

const handleFileRemoved = (file, index) => {
  console.log('File removed:', file.name, 'at index:', index)
  updateSelectedFiles()
}

const handleFormFileChange = (fileList) => {
  console.log('Form files selected:', fileList)
}

// Update combined selected files
const updateSelectedFiles = () => {
  const allFiles = []
  
  Object.values(files.value).forEach(fileList => {
    if (fileList) {
      if (Array.isArray(fileList)) {
        allFiles.push(...fileList)
      } else if (fileList.length) {
        allFiles.push(...Array.from(fileList))
      }
    }
  })
  
  selectedFiles.value = allFiles
}

// Remove file
const removeFile = (index) => {
  selectedFiles.value.splice(index, 1)
}

// Form handlers
const handleSubmit = async () => {
  isSubmitting.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert('บันทึกข้อมูลเรียบร้อยแล้ว!')
    resetForm()
  } catch (error) {
    alert('เกิดข้อผิดพลาด: ' + error.message)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    category: null,
    description: '',
    files: null
  }
}

// Utility functions
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getFileIcon = (file) => {
  const type = file.type.toLowerCase()
  
  if (type.startsWith('image/')) return 'photo'
  if (type.startsWith('video/')) return 'film'
  if (type.startsWith('audio/')) return 'musical-note'
  if (type.includes('pdf')) return 'document-text'
  if (type.includes('word') || type.includes('doc')) return 'document-text'
  if (type.includes('excel') || type.includes('sheet')) return 'table-cells'
  if (type.includes('powerpoint') || type.includes('presentation')) return 'presentation-chart-bar'
  if (type.includes('zip') || type.includes('rar') || type.includes('archive')) return 'archive-box'
  if (type.includes('text/')) return 'document-text'
  
  return 'document'
}

const getFileIconColor = (file) => {
  const type = file.type.toLowerCase()
  
  if (type.startsWith('image/')) return 'text-success'
  if (type.startsWith('video/')) return 'text-error'
  if (type.startsWith('audio/')) return 'text-warning'
  if (type.includes('pdf')) return 'text-error'
  if (type.includes('word') || type.includes('doc')) return 'text-info'
  if (type.includes('excel') || type.includes('sheet')) return 'text-success'
  if (type.includes('powerpoint') || type.includes('presentation')) return 'text-warning'
  
  return 'text-base-content/60'
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>