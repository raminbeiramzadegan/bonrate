import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual auth state

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    // Implement logout logic here
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Bonrate Pro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/template-editor">Template Editor</Nav.Link>
                <Nav.Link as={Link} to="/campaign-wizard">Campaign Wizard</Nav.Link>
                <Nav.Link as={Link} to="/drip-automation">Drip Automation</Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button variant="outline-light" onClick={handleLogin}>Login</Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;