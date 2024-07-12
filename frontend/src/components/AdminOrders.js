import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../css_files/CartPage.css';
import SideNavbar from './SideNavbar';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://bookcorner-jx21.onrender.com/orders', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('Response from backend:', response.data); 
        setOrders(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid"  style={{ fontFamily: 'Lato, sans-serif' }}>
        <div className="row">
          <SideNavbar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container mt-4">
              <h2>Orders</h2>
              {orders.length === 0 ? (
                <p>No orders placed yet!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>Order ID</th>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.userId}</td>
                          <td>{order.Name}</td>
                          <td>{order.Address}</td>
                          <td>{order.city}</td>
                          <td>{order.state}</td>
                          <td>{order.Phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminOrders;
