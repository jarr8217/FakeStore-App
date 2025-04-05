import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { Form, Button, Alert, Spinner, Card, Modal } from "react-bootstrap";

const API_URL = "https://fakestoreapi.com/products"; // Base API URL

const EditProduct = () => {
  const { id } = useParams(true);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {

    if (!id) {
      console.error("Invalid product ID. Cannot fetch product.");
      setError("Invalid product ID. Please check the URL and try again.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      console.log(`Fetching product with ID: ${id}`);
      try {
        const res = await axios.get(`${API_URL}/${id}`); // Fetch product using axios
        console.log("Product fetched successfully:", res.data);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
        console.log("Loading state set to false");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    console.log(`Updating field ${e.target.name} with value: ${e.target.value}`);
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting updated product:", product);
    console.log("Product ID:", id); // Debugging log to verify `id`

    if (id) {
      console.error("Invalid product ID. Cannot update product.");
      setError("Invalid product ID. Please try again.");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, product); // Update product using axios
      console.log("Product updated successfully");
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Failed to update product. Please try again.");
    }
  };

  const handleDelete = async () => {
    console.log(`Attempting to delete product with ID: ${id}`);
    setShowDeleteModal(false); // Close the modal
    console.log("Delete modal closed");

    if (!id) {
        console.error("Invalid product ID. Cannot update product.");
        setError("Invalid product ID. Please try again.");
        return;
      }

    try {
      await axios.delete(`${API_URL}/${id}`); // Delete product using axios
      console.log("Product deleted successfully, redirecting to product listing...");
      navigate("/products");
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again.");
    }
  };

  if (loading) {
    console.log("Loading spinner displayed");
    return <Spinner animation="border" variant="danger" />;
  }

  if (error) {
    console.log("Error alert displayed:", error);
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-5">
      <Card className="bg-dark text-light border-danger shadow p-4">
        <h2 className="text-danger mb-4">Edit Product</h2>
        {success && <Alert variant="success">Product updated successfully!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={product.title || ""}
              onChange={handleChange}
              className="bg-dark text-light border-danger"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              className="bg-dark text-light border-danger"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={product.category || ""}
              onChange={handleChange}
              className="bg-dark text-light border-danger"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={product.image || ""}
              onChange={handleChange}
              className="bg-dark text-light border-danger"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={product.description || ""}
              onChange={handleChange}
              className="bg-dark text-light border-danger"
              required
            />
          </Form.Group>

          <Button variant="danger" type="submit" className="w-100 mb-3">
            Update Product
          </Button>
        </Form>

        <Button
          variant="outline-danger"
          className="w-100"
          onClick={() => {
            console.log("Delete button clicked, showing confirmation modal");
            setShowDeleteModal(true);
          }}
        >
          Delete Product
        </Button>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              console.log("Cancel button clicked, hiding confirmation modal");
              setShowDeleteModal(false);
            }}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProduct;
