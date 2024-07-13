
import React from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <Link to="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span className="fs-4">Admin Panel</span>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li>
          <Link to="/admin/uploadbook" className="nav-link link-dark">
            Books
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className="nav-link link-dark">
            Orders
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default SideNavbar;
