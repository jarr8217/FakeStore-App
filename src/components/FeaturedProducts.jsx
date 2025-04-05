// src/components/FeaturedProducts.jsx

import React, { useEffect, useState, Link } from 'react';
import { Spinner, Alert, Card, Button } from 'react-bootstrap';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching featured products...');
        const res = await fetch('https://fakestoreapi.com/products?limit=6'); // limit to 6 for featured
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        console.log('Fetched products:', data);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    console.log('Loading featured products...');
    return <Spinner animation="border" variant="primary" />;
  }
  if (error) {
    console.error('Error in FeaturedProducts:', error);
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="row">
      {products.map(product => (
        <div key={product.id} className="col-md-4 mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src={product.image} alt={product.title} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
                <br />
                <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
              </Card.Text>
              <Button
                variant="primary"
                as={Link}
                to={`/products/${product.id}`}
                onClick={() => console.log(`View Details clicked for Product ID: ${product.id}`)}
              >
                View Details
              </Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
