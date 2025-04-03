import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Form } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Guabancex</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
             <NavDropdown title="Dropdown" id="navbar">
              <NavDropdown.Item href="#action3">Add Product</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Update Product</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Delete Product</NavDropdown.Item>
            </NavDropdown> 
          </Nav>
        <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;