import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DeleteProduct = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  

  const handleDelete = async () => {

    if (!productId) {
      console.error('Invalid productId:', id);
      alert('Error: Invalid product ID');
      return;
    }

    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Delete failed with status:', response.status, 'Response:', errorData);
        alert(`Error deleting product: ${errorData.message || 'Unknown error'}`);
        return;
      }

      console.log('Delete response:', response);
      setShowModal(false);
      console.log('Navigating to /products');
      navigate('/products'); // Adjust to your route
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Error deleting product');
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => {
        console.log('Opening delete confirmation modal');
        setShowModal(true);
      }}>
        Delete
      </Button>

      <Modal show={showModal} onHide={() => {
        console.log('Closing delete confirmation modal');
        setShowModal(false);
      }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this product? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            console.log('Cancel button clicked');
            setShowModal(false);
          }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteProduct;
