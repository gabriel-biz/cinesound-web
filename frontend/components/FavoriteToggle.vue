<template>
  <UTooltip :text="tooltipLabel" :popper="{ placement: 'top' }">
    <UButton
      :aria-pressed="modelValue"
      :color="modelValue ? 'worship' : 'gray'"
      variant="ghost"
      icon="i-heroicons-heart"
      @click="toggle"
    >
      <span class="sr-only">{{ tooltipLabel }}</span>
    </UButton>
  </UTooltip>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    activeLabel?: string
    inactiveLabel?: string
  }>(),
  {
    activeLabel: 'Remover dos favoritos',
    inactiveLabel: 'Adicionar aos favoritos'
  }
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

const tooltipLabel = computed(() => (props.modelValue ? props.activeLabel : props.inactiveLabel))

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>
