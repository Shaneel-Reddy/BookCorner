import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Sell from './pages/Sell';
import SearchPage from './pages/SearchPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RefreshHandler from './RefreshHandler';
import CartsPage from './pages/CartsPage';
import OrdersPage from './pages/OrdersPage';
import Admin from './pages/Admin';
import MembershipPage from './pages/MembershipPage';
import UploadBook from './components/UploadBook';
import AdminOrders from './components/AdminOrders';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element, path }) => {
    if ((path === '/home' || path === '/sell' || path === '/search-results') && !isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        
        <Routes>
          <Route path='/' element={<Navigate to="/login"/>}/>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path='/home' element={<PrivateRoute element={<Home />} path="/home" />} />
          <Route path="/sell" element={<PrivateRoute element={<Sell />} path="/sell" />} />
          <Route path="/cart" element={<PrivateRoute element={<CartsPage/>} path="/cart" />} />
          <Route path="/order" element={<PrivateRoute element={<OrdersPage/>} path="/order" />} />
          <Route path="/admin" element={<PrivateRoute element={<Admin/>} path="/admin" />} />
          <Route path="/membership" element={<PrivateRoute element={<MembershipPage/>} path="/membership" />} />
          <Route path="/admin/orders" element={<AdminOrders/>} />
          <Route path="/admin/uploadbook" element={<UploadBook />} />

          <Route path="/search-results" element={<PrivateRoute element={<SearchPage />} path="/search-results" />} />
        </Routes>
     
      </div>
     
    </Router>
  );
}

export default App;
