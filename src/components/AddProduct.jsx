import axios from 'axios';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

const AddProduct = () => {
    const [product, setProduct] = useState();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
    });
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        console.log('Closing modal');
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.group('AddProduct Submission');
        console.log('Form Data:', formData);

        try {
            const response = await axios.post('https://fakestoreapi.com/products', formData);
            console.log('API Response:', response.data);
            setProduct(response.data);
            setSubmitted(true);
            setError(null);
            setShowModal(true); // Show modal on success
        } catch (err) {
            console.error('Error adding product:', err.message);
            setError(`Failed to add product: ${err.message}`);
            setSubmitted(false);
        } finally {
            console.groupEnd();
        }
    };

    return (
        <>
            <Container className='mt-5 border rounded p-4 shadow-sm' style={{ maxWidth: '600px' }}>
                <h2>Add New Product</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId='formTitle'>
                                <Form.Label className='fw-bold'>Title</Form.Label>
                                <Form.Control size='sm' type='text' name='title' value={formData.title} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='formPrice'>
                                <Form.Label className='fw-bold'>Price</Form.Label>
                                <Form.Control size='sm' type='number' name='price' value={formData.price} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col md={6}>
                            <Form.Group controlId='formImage'>
                                <Form.Label className='fw-bold'>Image URL</Form.Label>
                                <Form.Control size='sm' type='text' name='image' value={formData.image} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId='formCategory'>
                                <Form.Label className='fw-bold'>Category</Form.Label>
                                <Form.Control size='sm' type='text' name='category' value={formData.category} onChange={handleChange} required />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col lg={12}>
                            <Form.Group controlId='formDescription'>
                                <Form.Label className='fw-bold'>Description</Form.Label>
                                <Form.Control as='textarea' name='description' value={formData.description} onChange={handleChange} required />
                            </Form.Group>
                        </Col>       
                    </Row>
                    <Button variant='primary' type='submit' className='mt-3'>Add Product</Button>
                </Form>

                {submitted && (
                    <Alert variant='success' className='mt-3'>
                        Product added successfully! ID: {product.id}
                    </Alert>
                )}

                {error && (
                    <Alert variant='danger' className='mt-3'>
                        {error}
                    </Alert>
                )}
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Added</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Product added successfully! ID: {product?.id}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddProduct;