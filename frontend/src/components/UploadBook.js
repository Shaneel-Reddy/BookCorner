import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SideNavbar from '../components/SideNavbar'; 

const UploadBook = () => {
  const [form, setForm] = useState({
    title: '',
    author: '',
    imageUrl: '',
    category: '',
    description: '',
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
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/postbooks`, form)
      .then(response => {
        alert('Book submitted successfully!');
        setForm({
          title: '',
          author: '',
          imageUrl: '',
          category: '',
          description: '',
          price: ''
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div style={{ fontFamily: 'Lato, sans-serif' }}>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <SideNavbar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container mt-4">
              <h1>Sell Your Book</h1>
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
                <div className="col-md-4">
                  <label className="form-label">Expected Price</label>
                  <input type="text" name="price" value={form.price} onChange={handleChange} className="form-control" placeholder="Enter expected price" required />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className="form-select" aria-label="Select book category" required>
                    <option value="">Genre</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    <option value="biography">Biography</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Image URL</label>
                  <input type="text" name="imageUrl" value={form.imageUrl} onChange={handleChange} className="form-control" placeholder="Enter Image URL" required />
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">Sell</button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadBook;
