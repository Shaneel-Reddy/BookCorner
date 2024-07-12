import React from 'react';
import BookComponent from './BookComponent';

const BookList = ({ books }) => {
  return (
    <div className="container mt-4"> 
      <div className="row">
        {books.map((book, index) => (
          <BookComponent key={index} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
