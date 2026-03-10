import apiClient from "./axiosConfig";


export const getProducts = async (params) => {
    const response = await apiClient.get("/products", { params });
    return response.data
};

export const getProductById = async (id) => {

    const response = await apiClient.get(`/products/${id}`);
    return response.data
};

export const deleteProduct = async (id) => {

    const response = await apiClient.delete(`/products/${id}`)
    return response.data
}

export const createProduct = async (data) => {

    const response = await apiClient.post("/products", data)
    return response.data
}