<template>
  <div class="w-[300px] p-4 border border-gray-200 rounded">
    <img
        :src="product.thumbnail"
        :alt="product.title"
        width="100"
        class="mb-3"
        loading="lazy"
    >
    <div>
      <h3 class="font-semibold mb-2 text-lg">{{ product.title }}</h3>
      <p class="mb-1 text-green-600 font-bold">{{ product.price }} ₽</p>
      <p class="mb-3 text-gray-600">{{ product.category }}</p>
      <NuxtLink
          :to="`/products/${product.id}`"
          class="text-blue-600 hover:underline"
      >
        Подробнее
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types';

defineProps<{
  product: IProduct
}>();
</script>
