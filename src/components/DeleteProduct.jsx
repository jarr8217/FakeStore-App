import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const DeleteProduct = () => {
    const [productId, setProductId] = useState('');

    const handleDelete = (e) => {
        e.preventDefault();
        console.log(`Deleting product with ID: ${productId}`);
        // Add logic to delete the product (e.g., API call)
        setProductId('');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Delete Product</h2>
                    <Form onSubmit={handleDelete}>
                        <Form.Group controlId="productId">
                            <Form.Label>Product ID</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter product ID"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="danger" type="submit" className="mt-3 w-100">
                            Delete Product
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default DeleteProduct;
