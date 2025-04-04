import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container fluid>
        <Navbar.Brand className='custom-brand' href="/">Guabancex</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
             <NavDropdown title="Dropdown" id="navbar">
              <NavDropdown.Item href="/AddProduct">Add Product</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Update Product</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Delete Product</NavDropdown.Item>
            </NavDropdown> 
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="outline-success">Search</Button>
          </Form> 
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;