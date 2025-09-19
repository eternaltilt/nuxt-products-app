<template>
  <div class="w-1/2">
    <h1 class="text-2xl font-bold mb-4">{{ product.title }}</h1>

    <div class="mb-4">
      <span class="text-xl font-bold mr-3">{{ product.price }} ₽</span>
      <span v-if="product.discountPercentage" class="text-green-600">
        Скидка: {{ product.discountPercentage }}%
      </span>
    </div>

    <div class="mb-4">
      Рейтинг: {{ product.rating }} / 5
    </div>

    <p class="mb-4">В наличии: {{ product.stock }} шт.</p>
    <p class="mb-6">{{ product.description }}</p>

    <div class="mb-6">
      <h3 class="font-semibold mb-3">Поделиться товаром:</h3>
      <VueQrcode
          v-if="productUrl"
          :value="productUrl"
          :width="120"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '~/types';
import VueQrcode from "qrcode.vue";

defineProps<{
  product: IProduct
  productUrl?: string
}>();
</script>
