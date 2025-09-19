<template>
  <div class="p-8">
    <h1 class="text-3xl font-bold mb-8">Каталог товаров</h1>
    <ProductFilter
        v-model:search-query="searchQuery"
        v-model:selected-category="selectedCategory"
        :categories="categories"
        @update:search-query="setSearchQuery"
        @update:selected-category="setSelectedCategory"
    />
    <div v-if="error" class="py-4 text-red-600 text-center">
      {{ error }}
    </div>
    <div v-if="!isLoading && products.length === 0" class="py-12 text-center text-gray-600">
      Товары не найдены
    </div>
    <ProductList v-else :products="products" />
    <div v-if="!isLoading && hasMoreProducts" class="text-center">
      <button
          @click="onClickLoadMore"
          class="px-6 py-2 bg-gray-200 rounded"
      >
        Загрузить еще
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useProductsStore } from "~/stores/products";
import { computed, onMounted } from 'vue';

const productsStore = useProductsStore();

const {
  products,
  categories,
  searchQuery,
  selectedCategory,
  isLoading,
  error,
  totalProducts,
  currentPage,
  limit
} = storeToRefs(productsStore);

const {
  fetchProducts,
  fetchCategories,
  setSearchQuery,
  setSelectedCategory,
  loadMoreProducts
} = productsStore;

const hasMoreProducts = computed(() => {
  return (currentPage.value + 1) * limit.value < totalProducts.value;
});

onMounted(async () => {
  await fetchProducts();
  await fetchCategories();
});

const onClickLoadMore = async () => {
  if (hasMoreProducts.value && !isLoading.value) {
    await loadMoreProducts();
  }
};
</script>
