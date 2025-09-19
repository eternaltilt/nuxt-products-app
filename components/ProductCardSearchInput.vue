<template>
  <div class="w-1/2">
    <label class="block mb-2 font-medium">Поиск товаров:</label>
    <input
        :value="modelValue"
        type="search"
        placeholder="Введите название товара"
        @input="updateValue"
        class="w-full p-3 border border-gray-300 rounded"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const updateValue = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}
</script>
