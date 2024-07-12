import React from 'react';
import heroImage from '../img/bookshop-website-design.jpg';
import heroImage2 from '../img/bookshop-website-design_1.jpg';
//import heroImage3 from '../img/ligntblue2.jpg';
import { Link } from 'react-router-dom'; 
export default function HeroComponent() {
  return (
    <div id="carouselExampleCaptions" className="carousel slide" style={{ fontFamily: 'Lato, sans-serif', maxWidth: '100%', overflow: 'hidden' }}>
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={heroImage} className="d-block w-100 img-fluid" style={{ maxHeight: '400px', objectFit: 'contain' }} alt="Slide 1" />
          <div className="carousel-caption d-none d-md-block">
            <h5>WELCOME TO BOOKCORNER</h5>
          </div>
        </div>
        <div className="carousel-item">
          <Link to="/sell"> 
            <img src={heroImage2} className="d-block w-100 img-fluid" style={{ maxHeight: '400px', objectFit: 'contain' }} alt="Slide 2" />
            <div className="carousel-caption d-none d-md-block" >
              <h5>Sell your old books at a good price!!</h5>
              <p>Click this Banner to sell your Book!</p>
            </div>
          </Link>
        </div>
        
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
