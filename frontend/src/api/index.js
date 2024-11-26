import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Backend API URL'niz
});

export const getUsers = () => api.get('/users');
export const getProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
