import type { IProduct, IProductResponse, TCategoriesResponse } from "~/types";

const BASE_URL = 'https://dummyjson.com/products';

export const productsApi = {
    async searchProducts(query: string, limit: number, skip: number): Promise<IProductResponse> {
        const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`;
        return fetchData(url);
    },

    async getProductsByCategory(category: string, limit: number, skip: number): Promise<IProductResponse> {
        const url = `${BASE_URL}/category/${category}?limit=${limit}&skip=${skip}`;
        return fetchData(url);
    },

    async getAllProducts(limit: number, skip: number): Promise<IProductResponse> {
        const url = `${BASE_URL}?limit=${limit}&skip=${skip}`;
        return fetchData(url);
    },

    async getCategories(): Promise<TCategoriesResponse> {
        const url = `${BASE_URL}/categories`;
        return fetchData(url);
    },

    async getProductById(id: string | number): Promise<IProduct> {
        const url = `${BASE_URL}/${id}`;
        return fetchData(url);
    }
};

async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('fetch data error');
    }

    return response.json();
}
