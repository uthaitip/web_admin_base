<template>
  <div class="flex flex-col gap-4 my-4 md:flex-row md:items-start md:justify-between">
    <!-- Title Section -->
    <div class="flex">
      <div class="flex items-center mx-3">
        <BaseIcon v-if="isBack" name="arrow-left" @click="$emit('back')" size="lg" class="cursor-pointer"/>
      </div>
      <div>
        <h2 :class="titleClasses">{{ title }}</h2>
        <p v-if="subtitle" :class="subtitleClasses">{{ subtitle }}</p>
      </div>
    </div>
    
    <!-- Actions Section Use Slot -->
    <div v-if="$slots.actions" class="flex-shrink-0">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface TopicHeaderProps {
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  titleClass?: string
  subtitleClass?: string,
  isBack?: boolean
}

const props = withDefaults(defineProps<TopicHeaderProps>(), {
  title: 'Topic Header',
  subtitle: '',
  size: 'md',
  titleClass: '',
  subtitleClass: '',
  isBack: false
})

const titleClasses = computed(() => {
  const baseClasses = 'font-bold text-base-content'
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  }
  
  return `${baseClasses} ${sizeClasses[props.size]} ${props.titleClass}`.trim()
})

const subtitleClasses = computed(() => {
  const baseClasses = 'text-base-content/60 mt-1'
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }
  
  return `${baseClasses} ${sizeClasses[props.size]} ${props.subtitleClass}`.trim()
})
</script>