import React, { useState, useEffect } from 'react';

const BookComponent = ({ book }) => {
  const [showModal, setShowModal] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
    setShowFullDescription(false);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const closeModal = (e) => {
    if (e.target.className.includes('modal-close')) {
      setShowModal(false);
      setShowFullDescription(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showModal]);

  return (
    <div className="col-md-2 mb-4 mt-4" style={{ fontFamily: 'Lato, sans-serif' }}>
      <div className="card h-100" onClick={toggleModal} style={{ cursor: 'pointer' }}>
        <img src={book.coverImageUrl} className="card-img-top img-fluid" alt={book.title} />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">
            {book.title.length > 30 ? `${book.title.slice(0, 35)}...` : book.title}
          </h5>
          <div>
            <button type="button" className="btn btn-primary mt-auto">View More Info</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" onClick={closeModal} data-backdrop="false">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{book.title}</h5>
                <button type="button" className="close modal-close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img src={book.coverImageUrl} className="img-fluid rounded-start" alt={book.title} />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        {showFullDescription ? (
                          <p className="card-text">{book.description}</p>
                        ) : (
                          <p className="card-text">{book.description.slice(0, 200)}...</p>
                        )}
                        <button className="btn btn-link" onClick={toggleDescription}>
                          {showFullDescription ? 'See Less' : 'See More'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-9">
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Genre:</strong> {book.genre}</p>
                    <p><strong>Average Rating:</strong> {book.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookComponent;
