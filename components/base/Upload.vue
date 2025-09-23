<template>
  <div class="w-full">
    <!-- Upload Area -->
    <div
      class="relative border-2 border-dashed rounded-lg p-6 transition-all duration-200"
      :class="[
        isDragOver ? 'border-primary bg-primary/5' : 'border-base-300 bg-base-100',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-primary hover:bg-primary/5'
      ]"
      @click="triggerFileInput"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <!-- Hidden File Input -->
      <input
        ref="fileInput"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        class="hidden"
        @change="handleFileChange"
      />

      <!-- Upload Content -->
      <div class="text-center">
        <div class="mb-4">
          <BaseIcon
            :name="uploadIcon"
            size="2xl"
            :class="isDragOver ? 'text-primary' : 'text-base-content/60'"
          />
        </div>
        
        <div class="space-y-2">
          <p class="text-base font-medium" :class="isDragOver ? 'text-primary' : 'text-base-content'">
            {{ isDragOver ? dropText : uploadText }}
          </p>
          <p class="text-sm text-base-content/60">
            {{ subtitle }}
          </p>
          
          <!-- File Type & Size Info -->
          <div v-if="accept || maxSize" class="text-xs text-base-content/50 space-y-1">
            <div v-if="accept">
              Supported: {{ formatAcceptTypes(accept) }}
            </div>
            <div v-if="maxSize">
              Max size: {{ formatFileSize(maxSize) }}
            </div>
          </div>
        </div>

        <!-- Upload Button -->
        <div class="mt-4">
          <BaseButton
            :label="buttonText"
            variant="primary"
            :disabled="disabled"
            size="sm"
            icon-left="cloud-arrow-up"
            @click.stop="triggerFileInput"
          />
        </div>
      </div>
    </div>

    <!-- File List -->
    <div v-if="showFileList && files.length > 0" class="mt-4 space-y-2">
      <h4 class="text-sm font-medium text-base-content">
        {{ multiple ? 'Selected Files' : 'Selected File' }} ({{ files.length }})
      </h4>
      
      <div class="space-y-2">
        <div
          v-for="(file, index) in files"
          :key="index"
          class="flex items-center justify-between p-3 bg-base-200 rounded-lg"
        >
          <div class="flex items-center gap-3 flex-1 min-w-0">
            <!-- File Icon -->
            <BaseIcon
              :name="getFileIcon(file)"
              size="md"
              :class="getFileIconColor(file)"
            />
            
            <!-- File Info -->
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-base-content truncate" :title="file.name">
                {{ file.name }}
              </p>
              <div class="flex items-center gap-2 text-xs text-base-content/60">
                <span>{{ formatFileSize(file.size) }}</span>
                <span v-if="file.type">{{ file.type }}</span>
              </div>
            </div>
          </div>
          
          <!-- Upload Status -->
          <div class="flex items-center gap-2">
            <div v-if="uploadProgress[index] !== undefined" class="flex items-center gap-2">
              <progress
                class="progress progress-primary w-20"
                :value="uploadProgress[index]"
                max="100"
              ></progress>
              <span class="text-xs">{{ uploadProgress[index] }}%</span>
            </div>
            
            <!-- Remove Button -->
            <button
              class="btn btn-ghost btn-xs"
              @click="removeFile(index)"
              :disabled="disabled"
            >
              <BaseIcon name="x-mark" size="xs" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Error Messages -->
    <div v-if="errors.length > 0" class="mt-3 space-y-1">
      <div
        v-for="(error, index) in errors"
        :key="index"
        class="alert alert-error py-2"
      >
        <BaseIcon name="exclamation-triangle" size="sm" />
        <span class="text-sm">{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface UploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  uploadText?: string
  dropText?: string
  subtitle?: string
  buttonText?: string
  showFileList?: boolean
  autoUpload?: boolean
  uploadUrl?: string
  uploadHeaders?: Record<string, string>
}

const props = withDefaults(defineProps<UploadProps>(), {
  accept: '*/*',
  multiple: false,
  maxSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 10,
  disabled: false,
  uploadText: 'Click to upload or drag and drop',
  dropText: 'Drop files here to upload',
  subtitle: 'Select files to upload to the server',
  buttonText: 'Choose Files',
  showFileList: true,
  autoUpload: false,
  uploadUrl: '',
  uploadHeaders: () => ({})
})

const emit = defineEmits<{
  filesSelected: [files: File[]]
  fileAdded: [file: File, index: number]
  fileRemoved: [file: File, index: number]
  uploadProgress: [progress: number, file: File, index: number]
  uploadComplete: [file: File, index: number, response?: any]
  uploadError: [error: string, file: File, index: number]
  error: [errors: string[]]
}>()

const fileInput = ref<HTMLInputElement>()
const isDragOver = ref(false)
const files = ref<File[]>([])
const uploadProgress = ref<Record<number, number>>({})
const errors = ref<string[]>([])

const uploadIcon = computed(() => {
  if (isDragOver.value) return 'cloud-arrow-down'
  return 'cloud-arrow-up'
})

// File handling methods
const triggerFileInput = () => {
  if (!props.disabled && fileInput.value) {
    fileInput.value.click()
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    processFiles(Array.from(target.files))
  }
}

const handleDragOver = (event: DragEvent) => {
  if (!props.disabled) {
    isDragOver.value = true
  }
}

const handleDragLeave = (event: DragEvent) => {
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  if (!props.disabled && event.dataTransfer?.files) {
    processFiles(Array.from(event.dataTransfer.files))
  }
}

const processFiles = (newFiles: File[]) => {
  errors.value = []
  const validFiles: File[] = []
  
  for (const file of newFiles) {
    // Validate file size
    if (file.size > props.maxSize) {
      errors.value.push(`${file.name} exceeds maximum size of ${formatFileSize(props.maxSize)}`)
      continue
    }
    
    // Validate file type
    if (props.accept !== '*/*' && !isFileTypeAccepted(file)) {
      errors.value.push(`${file.name} is not a supported file type`)
      continue
    }
    
    validFiles.push(file)
  }
  
  // Check max files limit
  const totalFiles = files.value.length + validFiles.length
  if (totalFiles > props.maxFiles) {
    errors.value.push(`Cannot exceed ${props.maxFiles} files`)
    return
  }
  
  // Add valid files
  if (props.multiple) {
    files.value.push(...validFiles)
  } else {
    files.value = validFiles.slice(0, 1)
  }
  
  // Emit events
  emit('filesSelected', [...files.value])
  
  validFiles.forEach((file, index) => {
    const fileIndex = files.value.indexOf(file)
    emit('fileAdded', file, fileIndex)
    
    if (props.autoUpload && props.uploadUrl) {
      uploadFile(file, fileIndex)
    }
  })
  
  if (errors.value.length > 0) {
    emit('error', errors.value)
  }
}

const removeFile = (index: number) => {
  const removedFile = files.value[index]
  files.value.splice(index, 1)
  delete uploadProgress.value[index]
  emit('fileRemoved', removedFile, index)
  emit('filesSelected', [...files.value])
}

const uploadFile = async (file: File, index: number) => {
  if (!props.uploadUrl) return
  
  const formData = new FormData()
  formData.append('file', file)
  
  try {
    const xhr = new XMLHttpRequest()
    
    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100)
        uploadProgress.value[index] = progress
        emit('uploadProgress', progress, file, index)
      }
    })
    
    // Handle completion
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const response = xhr.responseText ? JSON.parse(xhr.responseText) : null
        emit('uploadComplete', file, index, response)
      } else {
        emit('uploadError', `Upload failed: ${xhr.statusText}`, file, index)
      }
    })
    
    // Handle error
    xhr.addEventListener('error', () => {
      emit('uploadError', 'Upload failed', file, index)
    })
    
    xhr.open('POST', props.uploadUrl)
    
    // Set headers
    Object.entries(props.uploadHeaders).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value)
    })
    
    xhr.send(formData)
  } catch (error) {
    emit('uploadError', `Upload error: ${error}`, file, index)
  }
}

// Utility methods
const isFileTypeAccepted = (file: File): boolean => {
  if (!props.accept || props.accept === '*/*') return true
  
  const acceptedTypes = props.accept.split(',').map(type => type.trim())
  
  return acceptedTypes.some(acceptedType => {
    if (acceptedType.startsWith('.')) {
      return file.name.toLowerCase().endsWith(acceptedType.toLowerCase())
    }
    
    if (acceptedType.includes('*')) {
      const [mainType] = acceptedType.split('/')
      return file.type.startsWith(mainType)
    }
    
    return file.type === acceptedType
  })
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const formatAcceptTypes = (accept: string): string => {
  if (accept === '*/*') return 'All files'
  
  return accept
    .split(',')
    .map(type => type.trim())
    .join(', ')
    .toUpperCase()
}

const getFileIcon = (file: File): string => {
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

const getFileIconColor = (file: File): string => {
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

// Expose methods for parent components
defineExpose({
  uploadAll: () => {
    files.value.forEach((file, index) => {
      if (props.uploadUrl && uploadProgress.value[index] === undefined) {
        uploadFile(file, index)
      }
    })
  },
  clearFiles: () => {
    files.value = []
    uploadProgress.value = {}
    errors.value = []
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  },
  getFiles: () => [...files.value]
})
</script>