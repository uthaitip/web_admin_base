<template>
  <div class="space-y-8">
    <!-- BaseInput Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseInput Component</h3>
            <p class="text-sm">Flexible input component supporting text, email, number, password, and more input types with DaisyUI styling.</p>
          </div>
        </div>

        <!-- Input Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="pencil" size="sm" />
            Basic Input Examples
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="inputDemo.text" type="text" label="Text Input" placeholder="Enter text..." />
            <BaseInput v-model="inputDemo.email" type="email" label="Email Input" placeholder="user@example.com" required />
            <BaseInput v-model="inputDemo.number" type="number" label="Number Input" placeholder="Enter number..." min="0" max="100" />
            <BaseInput v-model="inputDemo.password" type="password" label="Password Input" placeholder="Enter password..." required />
          </div>
        </div>

        <!-- Input Variants -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="swatch" size="sm" />
            Input Variants & Sizes
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput v-model="inputDemo.primary" label="Primary Input" variant="primary" placeholder="Primary variant..." />
            <BaseInput v-model="inputDemo.success" label="Success Input" variant="success" placeholder="Success variant..." />
            <BaseInput v-model="inputDemo.warning" label="Warning Input" variant="warning" placeholder="Warning variant..." />
            <BaseInput v-model="inputDemo.error" label="Error Input" variant="error" error="This field has an error" placeholder="Error variant..." />
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseInput v-model="value" type="text" label="Text Input" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseInput v-model="email" type="email" variant="primary" required /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseInput v-model="number" type="number" min="0" max="100" /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseTextarea Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseTextarea Component</h3>
            <p class="text-sm">Multi-line text input component with DaisyUI styling, validation, and auto-resize support.</p>
          </div>
        </div>

        <!-- Textarea Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="document-text" size="sm" />
            Textarea Examples
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseTextarea v-model="textareaDemo.basic" label="Basic Textarea" placeholder="Enter your text here..." :rows="3" />
            <BaseTextarea v-model="textareaDemo.required" label="Required Textarea" placeholder="This field is required..." required :rows="3" />
            <BaseTextarea v-model="textareaDemo.help" label="With Help Text" placeholder="Enter description..." help="This is help text to guide the user" :rows="4" />
            <BaseTextarea v-model="textareaDemo.error" label="With Error" placeholder="Enter text..." error="This field has an error" variant="error" :rows="4" />
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseTextarea v-model="value" label="Description" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseTextarea variant="primary" :rows="5" required /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseTextarea help="Enter detailed information" /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseDatePicker Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseDatePicker Component</h3>
            <p class="text-sm">Date, time, and datetime input component with proper formatting and validation.</p>
          </div>
        </div>

        <!-- DatePicker Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="calendar-days" size="sm" />
            DatePicker Examples
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BaseDatePicker v-model="dateDemo.date" label="Date Picker" type="date" @change="handleDateChange" />
            <BaseDatePicker v-model="dateDemo.time" label="Time Picker" type="time" />
            <BaseDatePicker v-model="dateDemo.datetime" label="DateTime Picker" type="datetime-local" />
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseDatePicker v-model="date" label="Date" type="date" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseDatePicker v-model="time" label="Time" type="time" /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseDatePicker v-model="datetime" type="datetime-local" /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseCheckbox Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseCheckbox Component</h3>
            <p class="text-sm">Checkbox input with support for indeterminate state and various styling variants.</p>
          </div>
        </div>

        <!-- Checkbox Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="check-circle" size="sm" />
            Checkbox Examples
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <BaseCheckbox v-model="checkboxDemo.basic" label="Basic Checkbox" />
            <BaseCheckbox v-model="checkboxDemo.required" label="Required" required />
            <BaseCheckbox v-model="checkboxDemo.disabled" label="Disabled" disabled />
            <BaseCheckbox v-model="checkboxDemo.indeterminate" label="Indeterminate" indeterminate />
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseCheckbox v-model="checked" label="Accept Terms" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseCheckbox v-model="enabled" required /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseCheckbox v-model="state" indeterminate /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseRadio Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseRadio Component</h3>
            <p class="text-sm">Radio button component for single-choice selections with consistent styling.</p>
          </div>
        </div>

        <!-- Radio Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="radio" size="sm" />
            Radio Examples
          </h3>
          <div class="space-y-4">
            <div>
              <p class="font-medium text-sm mb-2">Size Options:</p>
              <div class="flex gap-4">
                <BaseRadio v-model="radioDemo.size" name="size-demo" value="small" label="Small" />
                <BaseRadio v-model="radioDemo.size" name="size-demo" value="medium" label="Medium" />
                <BaseRadio v-model="radioDemo.size" name="size-demo" value="large" label="Large" />
              </div>
            </div>
            <div>
              <p class="font-medium text-sm mb-2">Color Options:</p>
              <div class="flex gap-4">
                <BaseRadio v-model="radioDemo.color" name="color-demo" value="red" label="Red" />
                <BaseRadio v-model="radioDemo.color" name="color-demo" value="blue" label="Blue" />
                <BaseRadio v-model="radioDemo.color" name="color-demo" value="green" label="Green" />
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseRadio v-model="selected" name="demo" value="option1" label="Option 1" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseRadio v-model="selected" name="demo" value="option2" label="Option 2" /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseRadio v-model="selected" name="demo" value="option3" disabled /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseSelect Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseSelect Component</h3>
            <p class="text-sm">Native HTML select component with DaisyUI styling for simple dropdown selections.</p>
          </div>
        </div>

        <!-- Select Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="chevron-up-down" size="sm" />
            Select Examples
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseSelect v-model="selectDemo.basic" label="Basic Select" :options="selectOptions" />
            <BaseSelect v-model="selectDemo.variant" label="Variant Select" variant="primary" :options="selectOptions" />
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseSelect v-model="value" :options="options" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseSelect label="Choose Option" variant="primary" /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseSelect :options="[{label:'Yes',value:true}]" /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseAutocomplete Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseAutocomplete Component</h3>
            <p class="text-sm">Advanced autocomplete input with API search support, debouncing, and flexible option handling.</p>
          </div>
        </div>

        <!-- Autocomplete Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="magnifying-glass" size="sm" />
            Autocomplete Examples
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseAutocomplete v-model="autocompleteDemo.basic" v-model:display-value="autocompleteDemo.basicDisplay" label="Basic Autocomplete" :options="autocompleteOptions" placeholder="Type to search..." />
            <BaseAutocomplete v-model="autocompleteDemo.custom" v-model:display-value="autocompleteDemo.customDisplay" label="Custom Keys" :options="autocompleteOptions" display-key="name" value-key="id" />
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseAutocomplete v-model="value" v-model:display-value="display" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseAutocomplete :options="options" @api-search="handleSearch" /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseAutocomplete display-key="name" value-key="id" /&gt;</code></pre>
          </div>
        </div>
      </div>
    </div>

    <!-- BaseFileInput Component -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <div class="alert alert-info">
          <BaseIcon name="information-circle" size="md" />
          <div>
            <h3 class="font-semibold">BaseFileInput Component</h3>
            <p class="text-sm">Simple file input component with validation, size variants, and support for single or multiple file selection.</p>
          </div>
        </div>

        <!-- File Input Examples -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="paper-clip" size="sm" />
            File Input Examples
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseFileInput v-model="fileDemo.single" label="Single File" placeholder="Choose file..." @change="handleFileChange" @file-removed="handleFileRemoved" />
            <BaseFileInput v-model="fileDemo.multiple" label="Multiple Files" multiple @change="handleMultipleFileChange" @file-removed="handleFileRemoved" />
            <BaseFileInput v-model="fileDemo.images" label="Images Only" accept="image/*" hint="Only image files are allowed" @file-removed="handleFileRemoved" />
            <BaseFileInput v-model="fileDemo.documents" label="Documents" accept=".pdf,.doc,.docx" variant="primary" @file-removed="handleFileRemoved" />
          </div>
        </div>

        <!-- File Input Variants -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="swatch" size="sm" />
            File Input Variants & Sizes
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseFileInput v-model="fileDemo.success" label="Success Variant" variant="success" size="sm" />
            <BaseFileInput v-model="fileDemo.warning" label="Warning Variant" variant="warning" />
            <BaseFileInput v-model="fileDemo.error" label="Error Variant" variant="error" error="Please select a valid file" />
            <BaseFileInput v-model="fileDemo.required" label="Required Field" required hint="This field is required" />
          </div>
        </div>

        <!-- File Display -->
        <div v-if="selectedFiles.length > 0" class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="document-text" size="sm" />
            Selected Files
          </h3>
          <div class="space-y-2">
            <div v-for="file in selectedFiles" :key="file.name" class="flex items-center gap-3 p-2 bg-base-100 rounded-lg">
              <BaseIcon name="document" size="sm" class="text-primary" />
              <div class="flex-1">
                <p class="text-sm font-medium">{{ file.name }}</p>
                <p class="text-xs text-base-content/60">{{ formatFileSize(file.size) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Usage Code -->
        <div class="bg-base-200 rounded-lg p-4">
          <h3 class="font-semibold mb-3 flex items-center gap-2">
            <BaseIcon name="code-bracket" size="sm" />
            Usage Examples
          </h3>
          <div class="mockup-code text-sm">
            <pre data-prefix="1"><code>&lt;BaseFileInput v-model="files" label="Upload File" /&gt;</code></pre>
            <pre data-prefix="2"><code>&lt;BaseFileInput v-model="images" accept="image/*" multiple /&gt;</code></pre>
            <pre data-prefix="3"><code>&lt;BaseFileInput accept=".pdf,.doc" variant="primary" required /&gt;</code></pre>
            <pre data-prefix="4"><code>&lt;BaseFileInput @change="handleFileChange" @file-removed="handleFileRemoved" /&gt;</code></pre>
            <pre data-prefix="5"><code>&lt;BaseFileInput :show-file-list="false" /&gt; // Hide file list</code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props for demo data from parent
const props = defineProps({
  inputDemo: { type: Object, required: true },
  textareaDemo: { type: Object, required: true },
  dateDemo: { type: Object, required: true },
  checkboxDemo: { type: Object, required: true },
  radioDemo: { type: Object, required: true },
  selectDemo: { type: Object, required: true },
  selectOptions: { type: Array, required: true },
  autocompleteDemo: { type: Object, required: true },
  autocompleteOptions: { type: Array, required: true },
  fileDemo: { type: Object, required: true }
})

// File demo state
const selectedFiles = ref([])

// File handling methods
const handleFileChange = (files) => {
  console.log('Single file selected:', files)
  updateSelectedFiles()
}

const handleMultipleFileChange = (files) => {
  console.log('Multiple files selected:', files)
  updateSelectedFiles()
}

const handleFileRemoved = (file, index) => {
  console.log('File removed:', file.name, 'at index:', index)
  updateSelectedFiles()
}

// Update combined selected files from all file inputs
const updateSelectedFiles = () => {
  const allFiles = []
  
  Object.values(props.fileDemo).forEach(fileList => {
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

// Utility function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

const handleDateChange = (value) => {
  console.log('Date changed:', value)
} 

</script>

<style scoped>
input, textarea, select {
  outline: none !important;
}

input:focus, textarea:focus, select:focus {
  outline: none !important;
}
</style>