import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HorizontalCards from './HorizantalCards';

const UsedBookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/usedbooks`)
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <HorizontalCards cards={books} />
    </div>
  );
};

export default UsedBookList;
