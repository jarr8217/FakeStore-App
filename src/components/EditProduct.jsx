import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Modal } from 'react-bootstrap';

const EditProduct = () => {
    const { id } = useParams(); // Get product ID from route params
    const navigate = useNavigate(); // Initialize navigate
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete modal
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
                console.log('Fetched product data:', response.data);
                setFormData({
                    id: response.data.id || '', // Ensure ID is set
                    title: response.data.title || '',
                    price: response.data.price || '',
                    description: response.data.description || '',
                    category: response.data.category || '',
                    image: response.data.image || '',
                });
            } catch (err) {
                console.error('Error fetching product:', err.message);
                setError(`Failed to fetch product: ${err.message}`);
            }
        };
        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value || '' }); // Ensure value is never undefined
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate formData
        if (!formData.title.trim() || !formData.price || !formData.description.trim() || !formData.category.trim() || !formData.image.trim()) {
            setError('All fields are required and must not be empty.');
            return;
        }

        console.log('Submitting form with data:', formData);
        try {
            const response = await axios.put(`https://fakestoreapi.com/products/${id}`, formData);
            console.log('Edited Product:', response.data);
            setSubmitted(true);
            setError(null);
        } catch (err) {
            console.error('Error updating product:', err.message);
            setError(`Failed to update product: ${err.message}`);
            setSubmitted(false);
        }
    };

    const handleDelete = async (id) => {
        console.log('Delete button clicked for product ID:', id);

        if (!id) {
            console.error('Invalid product ID:', id);
            setError('Error: Invalid product ID');
            return;
        }

        try {
            await axios.delete(`https://fakestoreapi.com/products/${id}`);
            console.log('Product deleted successfully');
            setShowDeleteModal(false);
            setSubmitted(true);
            setError(null);
            navigate('/products'); // Redirect to product list page
        } catch (err) {
            console.error('Error deleting product:', err.message);
            setError(`Failed to delete product: ${err.message}`);
            setSubmitted(false);
        }
    };

    return (
        <Container className='mt-5 border rounded p-4 shadow-sm' style={{ maxWidth: '600px' }}>
            <h2>Edit Product</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={4}>
                        <Form.Group controlId='formId'>
                            <Form.Label className='fw-bold'>ID</Form.Label>
                            <Form.Control
                                size='sm'
                                type='text'
                                name='id'
                                value={formData.id || ''} // Default to empty string
                                onChange={handleChange}  
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId='formTitle'>
                            <Form.Label className='fw-bold'>Title</Form.Label>
                            <Form.Control
                                size='sm'
                                type='text'
                                name='title'
                                value={formData.title || ''} // Default to empty string
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId='formPrice'>
                            <Form.Label className='fw-bold'>Price</Form.Label>
                            <Form.Control
                                size='sm'
                                type='number'
                                name='price'
                                value={formData.price || ''} // Default to empty string
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col md={6}>
                        <Form.Group controlId='formImage'>
                            <Form.Label className='fw-bold'>Image URL</Form.Label>
                            <Form.Control
                                size='sm'
                                type='text'
                                name='image'
                                value={formData.image || ''} // Default to empty string
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId='formCategory'>
                            <Form.Label className='fw-bold'>Category</Form.Label>
                            <Form.Control
                                size='sm'
                                type='text'
                                name='category'
                                value={formData.category || ''} // Default to empty string
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col lg={12}>
                        <Form.Group controlId='formDescription'>
                            <Form.Label className='fw-bold'>Description</Form.Label>
                            <Form.Control
                                as='textarea'
                                name='description'
                                value={formData.description || ''} // Default to empty string
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant='primary' type='submit' className='mt-3'>
                    Edit Product
                </Button>
                <Button
                    variant='danger'
                    className='ms-2 mt-3'
                    onClick={() => setShowDeleteModal(true)}
                >
                    Delete Product
                </Button>
            </Form>

            {submitted && !error && (
                <Alert variant='success' className='mt-3'>
                    Product updated successfully!
                </Alert>
            )}

            {error && (
                <Alert variant='danger' className='mt-3'>
                    {error}
                </Alert>
            )}

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this product? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant='danger' onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default EditProduct;
