<template>
  <component 
    :is="iconComponent" 
    :class="iconClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as OutlineIcons from '@heroicons/vue/24/outline'
import * as SolidIcons from '@heroicons/vue/24/solid'
import * as MiniIcons from '@heroicons/vue/20/solid'
import type { IconProps } from '~/composables/component_models/base'
const props = withDefaults(defineProps<IconProps>(), {
  variant: 'outline',
  size: 'md',
  class: ''
})

const iconComponent = computed(() => {
  const iconName = props.name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Icon'
  
  let component
  switch (props.variant) {
    case 'solid':
      component = SolidIcons[iconName as keyof typeof SolidIcons]
      break
    case 'mini':
      component = MiniIcons[iconName as keyof typeof MiniIcons]
      break
    case 'outline':
    default:
      component = OutlineIcons[iconName as keyof typeof OutlineIcons]
      break
  }
  
  // Fallback to a default icon if the requested icon doesn't exist
  if (!component) {
    console.warn(`Icon '${props.name}' not found in ${props.variant} variant, falling back to question-mark-circle`)
    return OutlineIcons.QuestionMarkCircleIcon
  }
  
  return component
})

const iconClasses = computed(() => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-10 h-10'
  }
  
  return [
    sizeClasses[props.size],
    props.class
  ].filter(Boolean).join(' ')
})
</script>