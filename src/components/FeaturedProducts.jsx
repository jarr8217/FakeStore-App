import React, { useEffect, useState } from 'react';
import { Spinner, Alert, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.info('Fetching featured products...');
        const res = await fetch('https://fakestoreapi.com/products?limit=6');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
        console.info('Featured products fetched successfully');
      } catch (err) {
        console.error('Error fetching featured products:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Spinner animation="border" variant="danger" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className="col-md-4 mb-4">
          <Card className="bg-dark text-light border-danger shadow h-100">
            <Card.Img
              variant="top"
              src={product.image}
              alt={product.title}
              className="product-img border border-danger rounded"
            />
            <Card.Body>
              <Card.Title className="text-danger">{product.title}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${product.price}
                <br />
                <strong>Rating:</strong> {product.rating?.rate || 'N/A'} ({product.rating?.count || 0} reviews)
              </Card.Text>
              <Button variant="danger" as={Link} to={`/products/${product.id}`} className="w-100">
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
