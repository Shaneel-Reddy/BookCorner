import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsSearch } from 'react-icons/bs'; 
import logo from '../img/logo.png'; 

const Navbar = () => {
  const [search, setSearch] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.isAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/gbooks?q=${search}`);
      navigate('/search-results', { state: { books: response.data } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ fontFamily: 'Lato, sans-serif' }}>
        <div className="container-fluid">
          <Link to="/home">
            <img src={logo} alt="BookNest" className="navbar-brand" style={{ maxWidth: '150px', height: 'auto' }} />
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sell">Sell</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/membership">Membership</Link>
              </li>
              {isAdmin && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">Admin</Link>
                </li>
              )}
            </ul>
            <form className="d-flex justify-content-center align-items-center mx-auto" role="search" onSubmit={handleSearch}>
              <div className="input-group" style={{ width: '700px' }}>
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search to Get your Favorite Books Info"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" type="submit">
                  <BsSearch />
                </button>
              </div>
            </form>

            <div className="navbar-nav">
              
            </div>
            <button type="button" className="btn btn-outline-danger ms-2" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
