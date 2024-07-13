import React from 'react';
import axios from 'axios';
import '../css_files/HorizontalCardScroller.css'; 

const HorizontalCards = ({ cards }) => {
  const addToCart = async (bookId) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/cart/add`, { bookId }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log('Book added to cart:', response.data);
    } catch (error) {
      console.error('Error adding book to cart:', error);
    }
  };

  return (
    <div className="card-container"  style={{ fontFamily: 'Lato, sans-serif' }}>
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <img src={card.imageUrl || 'default-image-url'} className="card-img-top" alt={card.title} />
          <div className="card-body">
            <h5 className="card-title">
              {card.title.length > 30 ? `${card.title.slice(0, 20)}...` : card.title}
            </h5>
            <p className="card-text"><strong>Author:</strong> {card.author}</p>
            <p className="card-text"><strong>Price: </strong>₹{card.price}</p>
            <button className="btn btn-primary" onClick={() => addToCart(card._id)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalCards;
