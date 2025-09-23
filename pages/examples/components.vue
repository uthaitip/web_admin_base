<template>
  <div class="min-h-screen bg-base-200">
    <!-- Page Header -->
    <div class="bg-base-100 shadow-sm border-b">
      <div class="container mx-auto px-4 py-4">
        <BaseTopicHeader 
          title="Component Examples" 
          subtitle="Comprehensive showcase of all base components with live examples and code snippets"
          :isBack="true"
          @back="$router.push('/')"
        >
          <template #actions>
            <div class="flex gap-2">
              <BaseButton 
                label="Documentation" 
                variant="ghost" 
                icon-left="book-open"
                @click="scrollToSection('docs')"
              />
            </div>
          </template>
        </BaseTopicHeader>
      </div>
    </div>

    <div class="container mx-auto px-4 py-8">
      <!-- Quick Navigation -->
      <div class="card bg-base-100 shadow-xl mb-8">
        <div class="card-body">
          <h3 class="card-title mb-4">
            <BaseIcon name="map" size="md" class="text-primary" />
            Quick Navigation
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            <BaseButton 
              v-for="section in navigationSections" 
              :key="section.id"
              :label="section.name"
              variant="ghost"
              size="sm"
              :icon-left="section.icon"
              @click="scrollToSection(section.id)"
            />
          </div>
        </div>
      </div>

      <!-- Form Components Section -->
      <section id="forms" class="mb-12">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">
              <BaseIcon name="document-text" size="lg" class="text-primary" />
              Form Components
            </h2>

            <!-- Input Examples -->
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold mb-4">Input Variations</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <BaseInput 
                    label="Basic Input"
                    placeholder="Enter text here"
                    hint="Basic text input"
                  />
                  <BaseInput 
                    label="Email Input"
                    type="email"
                    placeholder="user@example.com"
                    hint="Email validation included"
                  />
                  <BaseInput 
                    label="Password Input"
                    type="password"
                    placeholder="••••••••"
                    hint="Password field"
                  />
                  <BaseInput 
                    label="Phone Number"
                    mask="(###) ###-####"
                    placeholder="(123) 456-7890"
                    hint="Masked phone input"
                  />
                  <BaseInput 
                    label="Date Input"
                    mask="##/##/####"
                    placeholder="DD/MM/YYYY"
                    hint="Date mask example"
                  />
                  <BaseInput 
                    label="Required Field"
                    :required="true"
                    placeholder="This field is required"
                    hint="Required validation"
                  />
                </div>
              </div>

              <!-- Form Example -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Complete Form Example</h3>
                <div class="bg-base-200 p-6 rounded-lg">
                  <form @submit.prevent="handleFormSubmit" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <BaseInput 
                        v-model="formData.firstName"
                        label="First Name"
                        :required="true"
                        placeholder="John"
                      />
                      <BaseInput 
                        v-model="formData.lastName"
                        label="Last Name"
                        :required="true"
                        placeholder="Doe"
                      />
                    </div>
                    
                    <BaseInput 
                      v-model="formData.email"
                      label="Email Address"
                      type="email"
                      :required="true"
                      placeholder="john.doe@example.com"
                    />
                    
                    <BaseInput 
                      v-model="formData.phone"
                      label="Phone Number"
                      mask="(###) ###-####"
                      placeholder="(123) 456-7890"
                    />
                    
                    <BaseSelect 
                      v-model="formData.country"
                      label="Country"
                      :options="countryOptions"
                      placeholder="Select your country"
                      :required="true"
                    />
                    
                    <BaseTextarea 
                      v-model="formData.message"
                      label="Message"
                      placeholder="Tell us about yourself..."
                      rows="4"
                    />
                    
                    <div class="flex gap-2">
                      <BaseButton 
                        type="submit"
                        label="Submit Form"
                        variant="primary"
                        icon-left="paper-airplane"
                        :loading="isSubmitting"
                      />
                      <BaseButton 
                        type="button"
                        label="Reset"
                        variant="ghost"
                        icon-left="arrow-path"
                        @click="resetForm"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- UI Components Section -->
      <section id="ui" class="mb-12">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">
              <BaseIcon name="squares-2x2" size="lg" class="text-secondary" />
              UI Components
            </h2>

            <!-- Buttons -->
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold mb-4">Button Variations</h3>
                <div class="flex flex-wrap gap-3 mb-4">
                  <BaseButton label="Default" />
                  <BaseButton label="Primary" variant="primary" />
                  <BaseButton label="Secondary" variant="secondary" />
                  <BaseButton label="Success" variant="success" />
                  <BaseButton label="Warning" variant="warning" />
                  <BaseButton label="Error" variant="error" />
                  <BaseButton label="Ghost" variant="ghost" />
                </div>
                
                <div class="flex flex-wrap gap-3 mb-4">
                  <BaseButton label="With Icon" variant="primary" icon-left="heart" />
                  <BaseButton label="Loading" variant="secondary" :loading="true" />
                  <BaseButton label="Disabled" :disabled="true" />
                  <BaseButton label="Large" size="lg" variant="accent" />
                  <BaseButton label="Small" size="sm" variant="info" />
                </div>
              </div>

              <!-- Accordion -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Accordion Example</h3>
                <BaseAccordion :items="accordionItems" :multiple="true" />
              </div>

              <!-- Upload -->
              <div>
                <h3 class="text-lg font-semibold mb-4">File Upload</h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <BaseUpload 
                    uploadText="Single File Upload"
                    subtitle="Click or drag to upload"
                    @filesSelected="handleFilesSelected"
                  />
                  <BaseUpload 
                    :multiple="true"
                    accept="image/*"
                    :maxFiles="5"
                    uploadText="Multiple Images"
                    subtitle="Upload up to 5 images"
                    @filesSelected="handleFilesSelected"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Data Display Section -->
      <section id="data" class="mb-12">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">
              <BaseIcon name="table-cells" size="lg" class="text-accent" />
              Data Display
            </h2>

            <!-- Table Example -->
            <div class="space-y-6">
              <div>
                <h3 class="text-lg font-semibold mb-4">Data Table</h3>
                <BaseTable 
                  :fields="tableFields"
                  :data="tableData"
                  :selectable="true"
                  striped
                  hover
                />
              </div>

              <!-- Avatar Examples -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Avatar Gallery</h3>
                <div class="flex flex-wrap gap-4 items-end">
                  <BaseAvatar name="John Doe" size="xs" />
                  <BaseAvatar name="Jane Smith" size="sm" />
                  <BaseAvatar name="Bob Wilson" size="md" />
                  <BaseAvatar name="Alice Brown" size="lg" />
                  <BaseAvatar name="Charlie Davis" size="xl" />
                  <BaseAvatar name="Eva Green" size="2xl" />
                </div>
                
                <div class="flex flex-wrap gap-4 mt-4">
                  <BaseAvatar name="Online User" :show-online="true" />
                  <BaseAvatar name="Admin" badge="A" />
                  <BaseAvatar name="VIP" :badge="{ icon: 'star', variant: 'warning' }" />
                  <BaseAvatar name="Square" shape="square" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Examples -->
      <section id="interactive" class="mb-12">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">
              <BaseIcon name="cursor-arrow-ripple" size="lg" class="text-info" />
              Interactive Examples
            </h2>

            <div class="space-y-8">
              <!-- Alert System -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Alert System</h3>
                <div class="flex flex-wrap gap-3">
                  <BaseButton 
                    label="Success Alert" 
                    variant="success" 
                    size="sm"
                    @click="showAlert('success', 'Success!', 'Operation completed successfully.')"
                  />
                  <BaseButton 
                    label="Error Alert" 
                    variant="error" 
                    size="sm"
                    @click="showAlert('error', 'Error!', 'Something went wrong.')"
                  />
                  <BaseButton 
                    label="Warning Alert" 
                    variant="warning" 
                    size="sm"
                    @click="showAlert('warning', 'Warning!', 'Please check your input.')"
                  />
                  <BaseButton 
                    label="Info Alert" 
                    variant="info" 
                    size="sm"
                    @click="showAlert('info', 'Info', 'Here is some information.')"
                  />
                </div>
              </div>

              <!-- Modal Example -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Modal Dialog</h3>
                <div class="flex gap-3">
                  <BaseButton 
                    label="Open Modal" 
                    variant="primary"
                    icon-left="window"
                    @click="showModal = true"
                  />
                  <BaseButton 
                    label="Large Modal" 
                    variant="secondary"
                    @click="showLargeModal = true"
                  />
                </div>
              </div>

              <!-- Real-time Demo -->
              <div>
                <h3 class="text-lg font-semibold mb-4">Real-time Counter Demo</h3>
                <div class="bg-base-200 p-6 rounded-lg">
                  <div class="text-center">
                    <div class="stat bg-base-100 rounded-lg inline-block">
                      <div class="stat-title">Counter Value</div>
                      <div class="stat-value text-primary">{{ counter }}</div>
                      <div class="stat-desc">Updates every second</div>
                    </div>
                    
                    <div class="mt-4 flex justify-center gap-2">
                      <BaseButton 
                        label="Start"
                        variant="success"
                        icon-left="play"
                        @click="startCounter"
                        :disabled="isCounterRunning"
                      />
                      <BaseButton 
                        label="Stop"
                        variant="error"
                        icon-left="stop"
                        @click="stopCounter"
                        :disabled="!isCounterRunning"
                      />
                      <BaseButton 
                        label="Reset"
                        variant="ghost"
                        icon-left="arrow-path"
                        @click="resetCounter"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Examples Section -->
      <section id="code" class="mb-12">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl mb-6">
              <BaseIcon name="code-bracket" size="lg" class="text-warning" />
              Code Examples
            </h2>

            <BaseAccordion :items="codeExamples" />
          </div>
        </div>
      </section>
    </div>

    <!-- Modals -->
    <BaseModal 
      v-model:visible="showModal"
      title="Example Modal"
      size="md"
    >
      <div class="space-y-4">
        <p>This is an example modal dialog. You can put any content here.</p>
        <BaseInput 
          label="Example Input"
          placeholder="Type something..."
        />
        <div class="flex gap-2">
          <BaseButton 
            label="Save"
            variant="primary"
            @click="showModal = false"
          />
          <BaseButton 
            label="Cancel"
            variant="ghost"
            @click="showModal = false"
          />
        </div>
      </div>
    </BaseModal>

    <BaseModal 
      v-model:visible="showLargeModal"
      title="Large Modal Example"
      size="lg"
    >
      <div class="space-y-6">
        <p>This is a large modal with more content.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput label="First Name" placeholder="John" />
          <BaseInput label="Last Name" placeholder="Doe" />
        </div>
        
        <BaseTextarea 
          label="Description"
          placeholder="Enter description..."
          rows="4"
        />
        
        <div class="flex justify-end gap-2">
          <BaseButton 
            label="Save Changes"
            variant="primary"
            @click="showLargeModal = false"
          />
          <BaseButton 
            label="Cancel"
            variant="ghost"
            @click="showLargeModal = false"
          />
        </div>
      </div>
    </BaseModal>

    <!-- Alert Component -->
    <BaseAlert 
      v-model:visible="alertData.visible"
      :type="alertData.type"
      :title="alertData.title"
      :message="alertData.message"
    />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// Meta
definePageMeta({
  title: 'Component Examples',
  description: 'Comprehensive showcase of all base components'
})

// Navigation sections
const navigationSections = [
  { id: 'forms', name: 'Forms', icon: 'document-text' },
  { id: 'ui', name: 'UI', icon: 'squares-2x2' },
  { id: 'data', name: 'Data', icon: 'table-cells' },
  { id: 'interactive', name: 'Interactive', icon: 'cursor-arrow-ripple' },
  { id: 'code', name: 'Code', icon: 'code-bracket' }
]

// Form data
const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  message: ''
})

const isSubmitting = ref(false)

const countryOptions = [
  { label: 'Thailand', value: 'TH' },
  { label: 'United States', value: 'US' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'Japan', value: 'JP' },
  { label: 'Singapore', value: 'SG' }
]

// Accordion data
const accordionItems = [
  {
    title: 'Getting Started',
    icon: 'rocket-launch',
    iconClass: 'text-primary',
    content: '<p>Welcome to our component library! This section helps you get started with using all available components.</p>'
  },
  {
    title: 'Advanced Features',
    icon: 'cog-6-tooth',
    iconClass: 'text-secondary',
    badge: 'New',
    content: '<p>Explore advanced features like masking, validation, and custom styling options.</p>'
  },
  {
    title: 'Best Practices',
    icon: 'light-bulb',
    iconClass: 'text-warning',
    content: '<p>Learn about best practices for using components effectively in your applications.</p>'
  }
]

// Table data
const tableFields = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' }
]

const tableData = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor', status: 'Inactive' },
  { name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' }
]

// Alert system
const alertData = reactive({
  visible: false,
  type: 'info',
  title: '',
  message: ''
})

// Modal states
const showModal = ref(false)
const showLargeModal = ref(false)

// Counter demo
const counter = ref(0)
const isCounterRunning = ref(false)
let counterInterval = null

// Code examples
const codeExamples = [
  {
    title: 'Basic Input Usage',
    icon: 'code-bracket',
    iconClass: 'text-primary',
    content: `<div class="mockup-code">
<pre><code>&lt;BaseInput 
  label="Name"
  placeholder="Enter your name"
  :required="true"
/&gt;</code></pre>
</div>`
  },
  {
    title: 'Masked Input Example',
    icon: 'phone',
    iconClass: 'text-secondary',
    content: `<div class="mockup-code">
<pre><code>&lt;BaseInput 
  label="Phone Number"
  mask="(###) ###-####"
  placeholder="(123) 456-7890"
  :maskOptions="{ masked: false }"
/&gt;</code></pre>
</div>`
  },
  {
    title: 'Button with Loading State',
    icon: 'cursor-arrow-ripple',
    iconClass: 'text-accent',
    content: `<div class="mockup-code">
<pre><code>&lt;BaseButton 
  label="Submit"
  variant="primary"
  icon-left="paper-airplane"
  :loading="isLoading"
  @click="handleSubmit"
/&gt;</code></pre>
</div>`
  }
]

// Methods
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}


const handleFormSubmit = () => {
  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    showAlert('success', 'Form Submitted!', 'Your form has been submitted successfully.')
    resetForm()
  }, 2000)
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
}

const handleFilesSelected = (files) => {
  showAlert('info', 'Files Selected', `${files.length} file(s) selected for upload.`)
}

const showAlert = (type, title, message) => {
  alertData.type = type
  alertData.title = title
  alertData.message = message
  alertData.visible = true
}

const startCounter = () => {
  if (!isCounterRunning.value) {
    isCounterRunning.value = true
    counterInterval = setInterval(() => {
      counter.value++
    }, 1000)
  }
}

const stopCounter = () => {
  if (isCounterRunning.value) {
    isCounterRunning.value = false
    clearInterval(counterInterval)
  }
}

const resetCounter = () => {
  stopCounter()
  counter.value = 0
}

// Cleanup
onUnmounted(() => {
  if (counterInterval) {
    clearInterval(counterInterval)
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}

section {
  scroll-margin-top: 2rem;
}
</style>