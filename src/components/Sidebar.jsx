import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {
  const location = useLocation();

  return (
    <Nav className="col-md-3 sidebar d-none d-md-block">
      <div className="sidebar-sticky">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/products"
            className={location.pathname === '/products' ? 'active' : ''}
          >
           <i className="bi bi-box-seam me-2"></i> Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/users"
            className={location.pathname === '/users' ? 'active' : ''}
          >
           <i className="bi bi-people me-2"></i> Users
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/cart"
            className={location.pathname === '/cart' ? 'active' : ''}
          >
            <i className="bi bi-cart me-2"></i>Cart Items
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            to="/bookings"
            className={location.pathname === '/bookings' ? 'active' : ''}
          >
           <i className="bi bi-clipboard-check me-2"></i> Orders
          </Nav.Link>
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Sidebar;
