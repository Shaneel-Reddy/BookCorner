import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SideNavbar from '../components/SideNavbar'; 
import UploadBook from '../components/UploadBook';

const Admin = () => {

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <SideNavbar />
          <UploadBook></UploadBook>
         
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
