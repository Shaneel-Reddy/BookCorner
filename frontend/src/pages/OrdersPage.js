import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css_files/CartPage.css';

const OrdersPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/order/getorder`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('Response from backend:', response.data);
        setBooks(response.data.books);
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
   
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Books in Orders</h2>
        {books.length === 0 ? (
          <p>No book Ordered yet!<br></br>
            Place an order as soon as possible!
          </p>
        ) : (
          <div className="row">
            {books.map((item) => (
              <div className="col-md-12 mb-3" key={item._id}>
                <div className="card cart-card">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={item.bookId ? item.bookId.imageUrl : ''}
                        className="card-img"
                        alt={item.bookId ? item.bookId.title : 'Image not available'}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.bookId ? item.bookId.title : 'Title not available'}</h5>
                        <p className="card-text">Author: {item.bookId ? item.bookId.author : 'Author not available'}</p>
                        <p className="card-text">Genre: {item.bookId ? item.bookId.category : 'Genre not available'}</p>
                        <p className="card-text">Price: ${item.bookId ? item.bookId.price : 'Price not available'}</p>
                        <p className="card-text">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <div className="col-md-9 d-flex justify-content-end align-items-center">
                      <p className="text-success">Order placed successfully!</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
