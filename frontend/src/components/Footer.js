import React from 'react';
import { Link } from 'react-router-dom';
import '../css_files/Footer.css'
const Footer = () => {
  return (
    <div className="footer-container" style={{ width: '100%', backgroundColor: '#f8f9fa', marginTop: 'auto' ,fontFamily: 'Lato, sans-serif'}}>
      <div className="container" style={{ paddingLeft: '15px', paddingRight: '15px' }}>
        <footer style={{ padding: '1rem 0' }}>
          <ul className="nav justify-content-center border-bottom pb-3 mb-3" style={{ marginBottom: '0' }}>
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sell">Sell</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cart">Cart</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/order">Orders</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/admin">Admin</Link></li>
          </ul>
          <p className="text-center text-body-secondary" style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6c757d' }}>
            &copy; 2024 Company, Inc
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
