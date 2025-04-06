import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for product details
  const [product, setProduct] = useState({
    id: id ? Number(id) : 0, // Ensure ID is a number
    title: '',
    price: 0,
    description: '',
    image: '',
    category: '',
  });

  // State for messages and errors
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch product details on component mount
  useEffect(() => {

    if (!id) {
      console.error("Invalid product ID. Cannot fetch product.");
      setError("Invalid product ID. Please check the URL and try again.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        console.info('Fetching product details for ID:', id); // Info log for fetch
        const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct({
          id: data.id,
          title: data.title || '',
          price: data.price || 0,
          description: data.description || '',
          image: data.image || '',
          category: data.category || '',
        });
        console.info('Product details fetched successfully'); // Success log
      } catch (err) {
        console.error('Error fetching product details:', err.message); // Error log
        setError('Failed to load product. Redirecting to home page...');
        setTimeout(() => navigate('/'), 3000); // Redirect after 3 seconds
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.debug(`Field "${name}" updated with value:`, value); // Debug log for field updates
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' ? (isNaN(parseFloat(value)) ? 0 : parseFloat(value)) : value || '',
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.info('Submitting updated product:', product); // Info log for submission
    try {
      const updatedProduct = {
        title: product.title,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.category,
      };
      const { data } = await axios.put(`https://fakestoreapi.com/products/1`, updatedProduct);
      console.info('Product updated successfully:', data); // Success log
      setMessage('Product updated successfully!');
      setTimeout(() => navigate('/products'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error('Error updating product:', err.message); // Error log
      setError('Failed to update product. Please try again.');
    }
  };

  // Handle product deletion
  const handleDelete = async () => {
    console.warn('Attempting to delete product with ID:', id); // Warn log for deletion
    try {
      const { data } = await axios.delete(`https://fakestoreapi.com/products/1`);
      console.info('Product deleted successfully:', data); // Success log
      setMessage('Product deleted successfully!');
      setTimeout(() => navigate('/products'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error('Error deleting product:', err.message); // Error log
      setError('Failed to delete product. Please try again.');
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-danger">Edit Product</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Product ID Field */}
        <Form.Group controlId="formId" className="mb-3">
          <Form.Label>Product ID</Form.Label>
          <Form.Control
            type="text"
            name="id"
            value={product.id || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Title Field */}
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={product.title || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Price Field */}
        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={product.price || 0}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Description Field */}
        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={product.description || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Image URL Field */}
        <Form.Group controlId="formImage" className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="image"
            value={product.image || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Category Field */}
        <Form.Group controlId="formCategory" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={product.category || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Action Buttons */}
        <Button variant="danger" type="submit" className="mt-3">
          Update Product
        </Button>
        <Button variant="danger" onClick={handleDelete} className="mt-3 ms-3">
          Delete Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
