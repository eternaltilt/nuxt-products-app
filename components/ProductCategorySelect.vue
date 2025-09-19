<template>
  <div class="w-1/2">
    <label class="block mb-2 font-medium">Категория:</label>
    <select
        :value="modelValue"
        @change="handleChange"
        class="w-full p-3 border border-gray-300 rounded"
    >
      <option value="">Все категории</option>
      <option
          v-for="category in categories"
          :key="category.slug"
          :value="category.slug"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from '~/types';

defineProps<{
  modelValue: string
  categories: ICategory[]
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>();

const handleChange = (event: Event) => {
  const value = (event.target as HTMLSelectElement).value;
  emit('update:modelValue', value);
};
</script>
