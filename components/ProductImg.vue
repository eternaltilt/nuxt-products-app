<template>
  <div class="w-1/2">
    <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full"
    >
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types';

defineProps<{
  product: IProduct
}>();
</script>
