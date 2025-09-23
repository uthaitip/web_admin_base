<template>
  <div class="form-control w-full">
    <!-- Label -->
    <label v-if="label" :for="inputId" class="label">
      <span class="label-text">
        {{ label }}
        <span v-if="required" class="text-error ml-1">*</span>
      </span>
    </label>
    
    <!-- File Input -->
    <input
      ref="fileInputRef"
      :id="inputId"
      :name="name"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      :class="inputClasses"
      @change="handleFileChange"
      @blur="handleBlur"
      @focus="handleFocus"
    />
    
    <!-- Selected Files List -->
    <div v-if="showFileList && selectedFiles.length > 0" class="mt-3 space-y-2">
      <div class="text-sm font-medium text-base-content">
        {{ multiple ? `Selected Files (${selectedFiles.length})` : 'Selected File' }}
      </div>
      
      <div class="space-y-2">
        <div
          v-for="(file, index) in selectedFiles"
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
          
          <!-- Remove Button -->
          <button
            type="button"
            class="btn btn-ghost btn-sm"
            @click="removeFile(index)"
            :disabled="disabled"
            :title="removeText || 'Remove file'"
          >
            <BaseIcon name="x-mark" size="sm" />
          </button>
        </div>
      </div>
    </div>
    
    <!-- Helper text -->
    <label class="label" v-if="hint || error">
      <span class="label-text-alt" :class="{ 'text-error': error, 'text-base-content/70': !error }">
        {{ error || hint }}
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'

interface FileInputProps {
  modelValue?: FileList | File[] | null
  label?: string
  accept?: string
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'bordered' | 'ghost' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  id?: string
  name?: string
  showFileList?: boolean
  removeText?: string
}

const props = withDefaults(defineProps<FileInputProps>(), {
  size: 'md',
  variant: 'default',
  accept: '*/*',
  multiple: false,
  showFileList: true,
  removeText: 'Remove file'
})

const emit = defineEmits<{
  'update:modelValue': [value: FileList | File[] | null]
  'update:error': [error: string | undefined]
  blur: [event: Event]
  focus: [event: Event]
  change: [event: Event]
  validate: [value: FileList | File[] | null]
  fileRemoved: [file: File, index: number]
}>()

const inputId = props.id || useId()
const fileInputRef = ref<HTMLInputElement>()
const selectedFiles = ref<File[]>([])

// Watch for modelValue changes to update selectedFiles
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    if (Array.isArray(newValue)) {
      selectedFiles.value = newValue
    } else if (newValue.length) {
      selectedFiles.value = Array.from(newValue)
    }
  } else {
    selectedFiles.value = []
  }
}, { immediate: true })

const inputClasses = computed(() => {
  const classes = ['file-input', 'w-full']
  
  // Size classes
  const sizeClasses = {
    xs: 'file-input-xs',
    sm: 'file-input-sm',
    md: '',
    lg: 'file-input-lg'
  }
  if (sizeClasses[props.size]) {
    classes.push(sizeClasses[props.size])
  }
  
  // Variant classes
  const variantClasses = {
    default: 'file-input-bordered',
    bordered: 'file-input-bordered',
    ghost: 'file-input-ghost',
    primary: 'file-input-primary file-input-bordered',
    secondary: 'file-input-secondary file-input-bordered',
    accent: 'file-input-accent file-input-bordered',
    info: 'file-input-info file-input-bordered',
    success: 'file-input-success file-input-bordered',
    warning: 'file-input-warning file-input-bordered',
    error: 'file-input-error file-input-bordered'
  }
  classes.push(variantClasses[props.variant])
  
  // Error state
  if (props.error && props.variant === 'default') {
    classes.push('file-input-error')
  }
  
  // Disabled state
  if (props.disabled) {
    classes.push('file-input-disabled')
  }
  
  return classes.join(' ')
})

// Validation function
const validateValue = (files: FileList | File[] | null): string | undefined => {
  // Required validation
  if (props.required && (!files || files.length === 0)) {
    return 'This field is required'
  }
  
  return undefined
}

// File management functions
const removeFile = (index: number) => {
  const removedFile = selectedFiles.value[index]
  selectedFiles.value.splice(index, 1)
  
  // Update modelValue
  const newValue = props.multiple ? selectedFiles.value : (selectedFiles.value.length > 0 ? selectedFiles.value : null)
  emit('update:modelValue', newValue)
  
  // Clear the input if no files left
  if (selectedFiles.value.length === 0 && fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  
  // Validate after removal
  const errorMessage = validateValue(selectedFiles.value.length > 0 ? selectedFiles.value : null)
  emit('update:error', errorMessage)
  emit('validate', newValue)
  emit('fileRemoved', removedFile, index)
}

// Event handlers
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  // Convert FileList to array for easier handling
  const fileArray = files ? Array.from(files) : null
  
  if (fileArray) {
    selectedFiles.value = fileArray
  } else {
    selectedFiles.value = []
  }
  
  emit('update:modelValue', props.multiple ? fileArray : files)
  
  // Validate on change
  const errorMessage = validateValue(files)
  emit('update:error', errorMessage)
  emit('validate', props.multiple ? fileArray : files)
  emit('change', event)
}

const handleBlur = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  
  // Validate on blur
  const errorMessage = validateValue(files)
  emit('update:error', errorMessage)
  emit('validate', props.multiple ? (files ? Array.from(files) : null) : files)
  emit('blur', event)
}

const handleFocus = (event: Event) => {
  emit('focus', event)
}

// Utility functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
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
</script>

<style scoped>
.file-input {
  outline: none !important;
}

.file-input:focus {
  outline: none !important;
}
</style>