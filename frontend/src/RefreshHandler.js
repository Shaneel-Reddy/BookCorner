import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setIsAuthenticated, setIsAdmin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (token && loggedInUser) {
      try {
        const user = JSON.parse(loggedInUser);
        setIsAuthenticated(true);
        setIsAdmin(user.isAdmin);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        navigate('/login');
      }
    }
  }, [setIsAuthenticated, setIsAdmin, navigate]);

  return null;
};

export default RefreshHandler;
