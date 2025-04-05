
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

export const getProduct = (id) => axios.get(`${API_URL}/${id}`);
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

