<template>
  <div class="p-6">
    <div v-if="loading" class="py-8 text-center">Загрузка товара</div>
    <div v-else-if="error" class="py-4 text-red-600">{{ error }}</div>

    <div v-else-if="product" class="flex gap-8 max-w-4xl mx-auto">
      <ProductImg :product="product" />
      <ProductInfo :product="product" :product-url="productUrl" />
    </div>

    <div class="mt-8 text-center">
      <button
          @click="goBackOnClick"
          class="px-6 py-2 bg-gray-200 rounded"
      >
        Назад
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {IProduct} from "~/types";

const route = useRoute();
const router = useRouter();
const productsStore = useProductsStore();

const product = ref<IProduct | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const productUrl = ref<string>('');

const productId = computed(() => route.params.id as string);

const fetchProduct = async () => {
  try {
    loading.value = true;
    error.value = null;
    product.value = await productsStore.fetchProductById(productId.value);
    productUrl.value = window.location.href;
  } catch (err) {
    error.value = 'Ошибка при получении товара';
  } finally {
    loading.value = false;
  }
};

const goBackOnClick = () => {
  router.back();
};

onMounted(() => {
  fetchProduct();
});

watch(productId, () => {
  fetchProduct();
});
</script>
