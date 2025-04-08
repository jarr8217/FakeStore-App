import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // Fetch products on component mount or search query change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.info('Fetching products...');
        const { data } = await axios.get('https://fakestoreapi.com/products');
        const filteredProducts = data.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setProducts(filteredProducts);
        console.info('Products fetched successfully');
      } catch (err) {
        console.error('Error fetching products:', err.message);
        setError(`Failed to load products: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading) return <p>Loading Products...</p>;
  if (error) return <p>{error}</p>;
  if (products.length === 0) return <p>No products found for "{searchQuery}"</p>;

  return (
    <Container className="mt-5">
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4}>
            <Card className="bg-dark text-light border-danger shadow mb-4">
              <Card.Img
                variant="top"
                src={product.image}
                alt={`Image of ${product.title}`}
                className="product-img img-fluid border border-danger rounded"
              />
              <Card.Body>
                <Card.Title className="text-danger">{product.title}</Card.Title>
                <Card.Text>
                  <ReactStars
                    count={5}
                    value={product.rating?.rate}
                    size={24}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                  <strong>Rating:</strong> {product.rating?.rate} ({product.rating?.count} reviews)
                </Card.Text>
                <Card.Text>
                  <strong>Price:</strong> ${product.price}
                </Card.Text>
                <Button
                  variant="danger"
                  as={Link}
                  to={`/products/${product.id}`}
                  className="w-100 mb-2"
                >
                  Product Details
                </Button>
                <Button
                  variant="outline-danger"
                  className="w-100"
                  onClick={() => console.info(`Add to Cart clicked for Product ID: ${product.id}`)}
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
