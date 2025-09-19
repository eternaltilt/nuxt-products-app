<template>
  <div class="flex flex-wrap gap-6 mb-8">
    <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types';

defineProps<{
  products: IProduct[]
}>();
</script>
