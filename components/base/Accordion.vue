<template>
  <div class="space-y-2">
    <div 
      v-for="(item, index) in items" 
      :key="index"
      class="collapse collapse-arrow bg-base-200"
      :class="{ 'collapse-open': openItems.includes(index) }"
    >
      <input 
        type="checkbox" 
        :checked="openItems.includes(index)"
        @change="toggle(index)"
        class="peer"
      />
      <div class="collapse-title text-xl font-medium flex items-center gap-2">
        <BaseIcon 
          v-if="item.icon" 
          :name="item.icon" 
          :size="iconSize" 
          :class="item.iconClass"
        />
        {{ item.title }}
        <div v-if="item.badge" class="ml-auto">
          <div class="badge badge-primary badge-sm">{{ item.badge }}</div>
        </div>
      </div>
      <div class="collapse-content">
        <div class="pt-2">
          <slot 
            :name="`content-${index}`" 
            :item="item" 
            :index="index"
          >
            <div v-if="item.content" v-html="item.content"></div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface AccordionItem {
  title: string
  content?: string
  icon?: string
  iconClass?: string
  badge?: string | number
  disabled?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  iconSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  defaultOpen?: number[]
}

const props = withDefaults(defineProps<AccordionProps>(), {
  items: () => [],
  multiple: false,
  iconSize: 'sm',
  defaultOpen: () => []
})

const emit = defineEmits<{
  change: [openItems: number[]]
  itemToggle: [index: number, isOpen: boolean]
}>()

const openItems = ref<number[]>(props.defaultOpen)

const toggle = (index: number) => {
  const item = props.items[index]
  if (item?.disabled) return

  if (props.multiple) {
    if (openItems.value.includes(index)) {
      openItems.value = openItems.value.filter(i => i !== index)
    } else {
      openItems.value.push(index)
    }
  } else {
    if (openItems.value.includes(index)) {
      openItems.value = []
    } else {
      openItems.value = [index]
    }
  }

  emit('change', openItems.value)
  emit('itemToggle', index, openItems.value.includes(index))
}

const isOpen = (index: number) => {
  return openItems.value.includes(index)
}

// Expose methods for parent components
defineExpose({
  toggle,
  isOpen,
  openAll: () => {
    if (props.multiple) {
      openItems.value = props.items.map((_, index) => index).filter(index => !props.items[index]?.disabled)
      emit('change', openItems.value)
    }
  },
  closeAll: () => {
    openItems.value = []
    emit('change', openItems.value)
  }
})
</script>