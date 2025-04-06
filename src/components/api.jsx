import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

// Fetch a single product by ID
export const getProduct = (id) => axios.get(`${API_URL}/${id}`);

// Update a product by ID
export const updateProduct = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete a product by ID
export const deleteProduct = (id) => axios.delete(`${API_URL}/${id}`);

// Export the base API URL for reuse
export default API_URL;
