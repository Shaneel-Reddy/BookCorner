import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Modal, Form, Button } from 'react-bootstrap';
import '../css_files/CartPage.css';

const CartPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    bookId: '',
    Name: '',
    Address: '',
    city: '',
    state: '',
    Phone: ''
  });

  const fetchBooksInCart = async () => {
    try {
      const response = await axios.get('https://bookcorner-jx21.onrender.com/cart/get', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setBooks(response.data.books);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooksInCart();
  }, []);

  const handleBuyButtonClick = (bookId) => {
    setShowFormModal(true);
    setFormData({ ...formData, bookId }); 
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);

    setFormData({
      bookId: '',
      Name: '',
      Address: '',
      city: '',
      state: '',
      Phone: ''
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.post(
        'https://bookcorner-jx21.onrender.com/order/addorder',
        {
          bookId: formData.bookId,
          quantity: 1,
          Name: formData.Name,
          Address: formData.Address,
          city: formData.city,
          state: formData.state,
          Phone: formData.Phone
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Order placed:', response.data);
      setShowFormModal(false);

      fetchBooksInCart();

    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const handleRemoveFromCart = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User is not authenticated');
      }

      const response = await axios.delete(`https://bookcorner-jx21.onrender.com/cart/remove/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
       
        fetchBooksInCart();
      } else {
        console.error('Failed to remove item from cart:', response.data.message);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    
  }

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h2>Books in Cart</h2>
        {books.length === 0 ? (
          <p>No books in cart</p>
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
                        <p className="card-text"><strong>Price: </strong>₹{item.bookId ? item.bookId.price : 'Price not available'}</p>
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <button onClick={() => handleRemoveFromCart(item.bookId._id)} className="btn btn-danger mr-3 remove-button">Remove from Cart</button>
                          <button onClick={() => handleBuyButtonClick(item.bookId._id)} className="btn btn-primary buy-button">Buy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal show={showFormModal} onHide={handleCloseFormModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" name="Name" value={formData.Name} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Address" name="Address" value={formData.Address} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter City" name="city" value={formData.city} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter State" name="state" value={formData.state} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter Phone" name="Phone" value={formData.Phone} onChange={handleInputChange} required />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={() => alert('Payment done')}>
              Confirm Payment!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartPage;
