import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Sell = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    quantity: '',
    Address: '',
    imageUrl: '',
    city: '',
    state: '',
    zip: '',
    Phone: '',
    price: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const cleanPhone = form.Phone.replace(/\s/g, '');

    setForm(prevForm => ({
      ...prevForm,
      Phone: cleanPhone
    }));

    axios.post('http://localhost:8000/submit', form)
      .then(response => {
        alert('Book submitted successfully!');
        setForm({
          title: '',
          author: '',
          category: '',
          description: '',
          quantity: '',
          Address: '',
          imageUrl: '',
          city: '',
          state: '',
          zip: '',
          Phone: '',
          price: ''
        });
      })
      .catch(error => {
        console.error('Error submitting book:', error);
        alert('Failed to submit book. Please check your input.');
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4" style={{ fontFamily: 'Lato, sans-serif' }}>
        <h2>To Sell your Old Book, Fill the Form below: </h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">Book Name</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control" placeholder="Enter book name" required />
          </div>
          <div className="col-md-6">
            <label className="form-label">Author</label>
            <input type="text" name="author" value={form.author} onChange={handleChange} className="form-control" placeholder="Enter author name" required />
          </div>
          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} className="form-control" rows="3" placeholder="Enter book description" required></textarea>
          </div>
          <div className="form-floating col-md-4">
            <input type="text" name="price" value={form.price} onChange={handleChange} className="form-control" placeholder="Enter expected price" required />
            <label htmlFor="floatingPassword">Expected Price</label>
          </div>
          <div className="form-floating col-md-4">
            <select name="category" value={form.category} onChange={handleChange} className="form-select" aria-label="Select book category" required>
              <option value="">Condition of the Book</option>
              <option value="fiction">Good</option>
              <option value="non-fiction">Slight Damage</option>
              <option value="biography">Need Binding</option>
            </select>
            <label htmlFor="floatingSelect">Category</label>
          </div>
          <div className="form-floating col-md-4">
            <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="form-control" placeholder="Enter quantity" required />
            <label htmlFor="floatingInput">Quantity</label>
          </div>
          <div className="input-group mb-3">
            <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} className="form-control" placeholder="Enter ImageUrl" required />
            <label htmlFor="Imageurl"></label>
          </div>

          <div className="col-12">
            <label className="form-label">Address</label>
            <input type="text" name="Address" value={form.Address} onChange={handleChange} className="form-control" placeholder="Enter address" required />
          </div>
          <div className="col-md-3">
            <label className="form-label">City</label>
            <input type="text" name="city" value={form.city} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-2">
            <label className="form-label">State</label>
            <input type="text" name="state" value={form.state} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-2">
            <label className="form-label">Zip</label>
            <input type="text" name="zip" value={form.zip} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-md-2">
            <label className="form-label">Phone Number</label>
            <input type="text" name="Phone" value={form.Phone} onChange={handleChange} className="form-control" required />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">Sell</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sell;
