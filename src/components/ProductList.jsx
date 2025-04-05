import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useLocation } from 'react-router-dom';
import Reactstars from 'react-rating-stars-component';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    console.log('Fetching products...');
    axios
      .get('https://fakestoreapi.com/products')
      .then((response) => {
        console.log('Fetched products:', response.data);
        const allProducts = response.data;
        const filteredProducts = allProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log(`Search query: "${searchQuery}", Filtered products:`, filteredProducts);
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error.message);
        setError(`Failed to load products: ${error.message}`);
        setLoading(false);
      });
  }, [searchQuery]);

  if (loading) {
    console.log('Loading products...');
    return <p>Loading Products...</p>;
  }
  if (error) {
    console.error('Error in ProductList:', error);
    return <p>{error}</p>;
  }
  if (products.length === 0) {
    console.warn(`No products found for query "${searchQuery}"`);
    return <p>No products found for "{searchQuery}"</p>;
  }

  return (
    <Container className='m-auto p-5 gap-2'>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <Card className='d-flex justify-content-center align-items-center' tyle={{ width: '18rem', marginBottom: '1rem' }}>
              <Card.Img
                variant="top"
                src={product.image}
                alt={`Image of ${product.title}`}
                className='img-fluid'
                style={{ width: '200px', height: '150px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  <Reactstars
                    count={5}
                    value={product.rating.rate}
                    size={24}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                  <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
                </Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Button
                  variant="primary"
                  as={Link}
                  to={`/products/${product.id}`}
                  onClick={() => console.log(`Product Details clicked for Product ID: ${product.id}`)}
                >
                  Product Details
                </Button>
                <Button
                  variant="warning"
                  style={{ marginLeft: '0.5rem' }}
                  onClick={() => console.log(`Add to Cart clicked for Product ID: ${product.id}`)}
                >
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
