import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

{/* Product Detail Component, arrow function */}
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
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
    <Container className='mt-5'>
      <Row>
        <Col md={6}>
         <image src={product.image} alt={product.title} className='img-fluid' />
        </Col>
        <Col md={6}>
        <Card>
          <Card.body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
            </Card.Text>
            <Card.Text>
              <strong>Product ID:</strong> {product.id}
            </Card.Text>
            <Card.Text>
              <strong>Brand:</strong> {product.brand}
            </Card.Text>
            <Card.Text>
              <strong>Category:</strong> {product.category}
            </Card.Text>
            <Card.Text>
              <strong>Price:</strong> ${product.price}
            </Card.Text>
            <Card.Text>
              <strong>Description:</strong> {product.description}
            </Card.Text>
          </Card.body>
          
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetails;