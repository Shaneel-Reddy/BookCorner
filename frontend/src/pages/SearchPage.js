import React from 'react';
import { useLocation } from 'react-router-dom';
import BookList from '../components/BookList';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SearchPage = () => {
  const location = useLocation();
  const { books } = location.state || { books: [] }; 

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <BookList books={books}></BookList>
        </div>
      <Footer></Footer>
      
    </div>
  );
};

export default SearchPage;
