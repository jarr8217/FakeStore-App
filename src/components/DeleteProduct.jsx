import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { deleteProduct } from './api';

const DeleteProduct = ({ productId }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      setShow(false);
      navigate('/products');
    } catch (err) {
      console.error('Error deleting product:', err.message);
    }
  };

  return (
    <>
      <Button variant="outline-danger" className="mt-3 w-100" onClick={() => setShow(true)}>
        Delete Product
      </Button>

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light border-danger">
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          Are you sure you want to delete this product? This action is irreversible.
        </Modal.Body>
        <Modal.Footer className="bg-dark border-danger">
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProduct;
