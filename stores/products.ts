import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ICategory, IProduct, IProductResponse } from "~/types";
import { productsApi } from '~/services/productsApi';

export const useProductsStore = defineStore('products', () => {
    const products = ref<IProduct[]>([]);
    const categories = ref<ICategory[]>([]);
    const searchQuery = ref<string>('');
    const selectedCategory = ref<string>('');
    const currentPage = ref<number>(0);
    const limit = ref<number>(20);
    const totalProducts = ref<number>(0);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const fetchProducts = async () => {
        isLoading.value = true;
        error.value = null;
        try {
            const calculatedSkip = currentPage.value * limit.value;

            let data: IProductResponse;

            if (searchQuery.value) {
                data = await productsApi.searchProducts(searchQuery.value, limit.value, calculatedSkip);
            } else if (selectedCategory.value) {
                data = await productsApi.getProductsByCategory(selectedCategory.value, limit.value, calculatedSkip);
            } else {
                data = await productsApi.getAllProducts(limit.value, calculatedSkip);
            }

            if (currentPage.value === 0) {
                products.value = data.products;
            } else {
                products.value = [...products.value, ...data.products];
            }
            totalProducts.value = data.total;
        } catch (err) {
            error.value = 'Ошибка при загрузке товаров';
            console.error('Ошибка загрузки товаров', err);
        } finally {
            isLoading.value = false;
        }
    };

    const fetchCategories = async () => {
        try {
            categories.value = await productsApi.getCategories();
        } catch (err) {
            error.value = 'Ошибка при загрузке категорий';
            console.error('Ошибка загрузки категорий', err);
        }
    };

    const fetchProductById = async (id: string | number): Promise<IProduct | null> => {
        try {
            return await productsApi.getProductById(id);
        } catch (err) {
            console.error('Ошибка получения продукта', err);
            throw err;
        }
    };

    const setSearchQuery = (query: string) => {
        searchQuery.value = query;
        resetPagination();
    };

    const setSelectedCategory = (categorySlug: string) => {
        selectedCategory.value = categorySlug;
        resetPagination();
    };

    const resetPagination = () => {
        currentPage.value = 0;
        fetchProducts();
    };

    const loadMoreProducts = async () => {
        const nextPage = (currentPage.value + 1) * limit.value;
        if (nextPage < totalProducts.value && !isLoading.value) {
            currentPage.value += 1;
            await fetchProducts();
        }
    };

    return {
        products,
        categories,
        searchQuery,
        selectedCategory,
        currentPage,
        limit,
        totalProducts,
        isLoading,
        error,
        fetchProducts,
        fetchCategories,
        fetchProductById,
        setSearchQuery,
        setSelectedCategory,
        loadMoreProducts
    };
});
