import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import Reactstars from 'react-rating-stars-component';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to load products: ${error.message}`);
        setLoading(false);
      });
  }, []); // Removed dependency on `products` to prevent infinite re-renders

  if (loading) return <p>Loading Products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <Card style={{ width: '18rem', marginBottom: '1rem' }}>
              <Card.Img
                variant="top"
                src={product.image}
                alt={`Image of ${product.title}`} // More descriptive alt text
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <Reactstars
                    count={5}
                    value={product.rating.rate} // Use product.rating.rate instead of product.rating
                    size={24}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                  <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
                </Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button variant="primary" as={Link} to={`/products/${product.id}`}>
                  Product Details
                </Button>
                <Button variant="warning" style={{ marginLeft: '0.5rem' }}>
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;