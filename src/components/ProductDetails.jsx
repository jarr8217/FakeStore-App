import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import { getProduct } from './api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to load product details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading Product...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Image
            src={product.image}
            alt={product.title}
            fluid
            className="border border-danger rounded"
          />
        </Col>
        <Col md={6}>
          <Card className="bg-dark text-light border-danger shadow">
            <Card.Body>
              <Card.Title className="text-danger">{product.title}</Card.Title>
              <Card.Text>
                <strong>Rating:</strong> {product.rating?.rate || 'N/A'} ({product.rating?.count || 0} reviews)
              </Card.Text>
              <Card.Text>
                <strong>Product ID:</strong> {product.id}
              </Card.Text>
              <Card.Text>
                <strong>Category:</strong> {product.category || 'Uncategorized'}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ${product.price || 'N/A'}
              </Card.Text>
              <Card.Text>
                <strong>Description:</strong> {product.description || 'No description available'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
