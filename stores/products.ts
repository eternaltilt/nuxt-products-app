import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ICategory, IProduct, IProductResponse, TCategoriesResponse } from "~/types";

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

            let url: string;

            if (searchQuery.value) {
                url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery.value)}&limit=${limit.value}&skip=${calculatedSkip}`;
            } else if (selectedCategory.value) {
                url = `https://dummyjson.com/products/category/${selectedCategory.value}?limit=${limit.value}&skip=${calculatedSkip}`;
            } else {
                url = `https://dummyjson.com/products?limit=${limit.value}&skip=${calculatedSkip}`;
            }

            const response = await fetch(url);
            const data = await response.json() as IProductResponse;

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
            const response = await fetch('https://dummyjson.com/products/categories');
            categories.value = await response.json() as TCategoriesResponse;
        } catch (err) {
            error.value = 'Ошибка при загрузке категорий';
            console.error('Ошибка загрузки категорий', err);
        }
    };

    const fetchProductById = async (id: string | number): Promise<IProduct | null> => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`);

            if (!response.ok) {
                console.error('Ошибка при выполнении запроса')
            }
            return await response.json() as IProduct;
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
