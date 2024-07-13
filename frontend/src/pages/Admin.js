import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SideNavbar from '../components/SideNavbar';


const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/users`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log('Response from backend:', response.data); 
        setUsers(response.data); 
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid" style={{ fontFamily: 'Lato, sans-serif' }}>
        <div className="row">
          <SideNavbar />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="container mt-4">
              <h2>User Details</h2>
              {users.length === 0 ? (
                <p>No users found!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
