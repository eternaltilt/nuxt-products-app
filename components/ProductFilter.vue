<template>
  <div class="flex gap-6 mb-8">
    <ProductCardSearchInput
        :model-value="searchQuery"
        @update:model-value="debouncedSearch"
    />
    <ProductCategorySelect
        :model-value="selectedCategory"
        @update:model-value="$emit('update:selectedCategory', $event)"
        :categories="categories"
    />
  </div>
</template>

<script setup lang="ts">
import type { ICategory } from '~/types';
import { useDebounce } from "~/composables";

const props = defineProps<{
  searchQuery: string
  selectedCategory: string
  categories: ICategory[]
}>();

const emit = defineEmits<{
  'update:searchQuery': [value: string]
  'update:selectedCategory': [value: string]
}>();

const debouncedSearch = useDebounce((value: string) => {
  emit('update:searchQuery', value);
}, 500);
</script>
