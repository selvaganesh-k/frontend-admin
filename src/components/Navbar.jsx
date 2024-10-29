import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg" className="shadow m-0 p-3">
    <Navbar.Brand as={Link} to="/">Fruit Shop Admin</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/products">Products</Nav.Link>
        <Nav.Link as={Link} to="/users">Users</Nav.Link>
        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
        <Nav.Link as={Link} to="/bookings">Orders</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default AdminNavbar;
