import React from 'react';
import Navbar from '../components/Navbar';
import '../css_files/Footer.css'
const MembershipPage = () => {
  const handleChoosePlan = (plan) => {
    alert(`You are now a member of the ${plan} plan!`);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5" style={{ fontFamily: 'Lato, sans-serif' }}>
        <h1 className="text-center mb-4">Membership Plans</h1>
        <h4 className="text-center mb-4">Wanna sell more used Books?</h4>
        <h5 className="text-center mb-4">Purchase the Below plans to sell more Books!</h5>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-header">
                <h3>100/Month</h3>
              </div>
              <div className="card-body">
                <h4 className="card-title">Sell 10 Books</h4>
                <p className="card-text">Perfect for small sellers</p>
                <div className="btn btn-primary" onClick={() => handleChoosePlan('100/Month')}>
                  Choose Plan
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-header">
                <h3>400/Month</h3>
              </div>
              <div className="card-body">
                <h4 className="card-title">Sell Unlimited Books</h4>
                <p className="card-text">Ideal for large sellers</p>
                <div className="btn btn-primary" onClick={() => handleChoosePlan('400/Month')}>
                  Choose Plan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MembershipPage;
