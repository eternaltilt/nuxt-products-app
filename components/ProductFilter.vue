<template>
  <div class="flex gap-6 mb-8">
    <ProductCardSearchInput
        v-model="searchQuery"
        @update:modelValue="onSearchChange"
    />
    <ProductCategorySelect
        v-model="selectedCategory"
        :categories="categories"
        @update:modelValue="onCategoryChange"
    />
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from '~/types';

const props = defineProps<{
  searchQuery: string
  selectedCategory: string
  categories: ICategory[]
}>();

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCategory': [value: string]
}>();

const searchQuery = ref(props.searchQuery);
const selectedCategory = ref(props.selectedCategory);

let searchTimeout

const onSearchChange = (value: string) => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    emit('update:searchQuery', value);
  }, 500);
};

const onCategoryChange = (value: string) => {
  emit('update:selectedCategory', value);
};

watch(() => props.searchQuery, (newValue) => {
  searchQuery.value = newValue;
});

watch(() => props.selectedCategory, (newValue) => {
  selectedCategory.value = newValue;
});
</script>
