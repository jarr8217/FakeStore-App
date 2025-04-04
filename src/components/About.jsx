import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="about mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h1" className="text-center">Guabancex</Card.Title>
                            <Card.Text>
                                Welcome to Guabancex, your one-stop shop for all your shopping needs! 
                                We offer a wide variety of products at unbeatable prices. Our mission 
                                is to provide a seamless and enjoyable shopping experience for our customers.
                            </Card.Text>
                            <Card.Text>
                                Whether you're looking for the latest gadgets, trendy fashion, or everyday 
                                essentials, FakeStore has got you covered. Thank you for choosing us!
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
