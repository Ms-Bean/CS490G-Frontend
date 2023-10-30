// Frontend: LogoutPage.js
import { useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch('http://localhost:3500/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if(response.ok) {
      logout();  // Clear isLoggedIn state
      navigate('/login');
    } else {
      console.error('Logout failed');
    }
  };

  useEffect(() => {
    handleLogout();
  }, []); 

  return null;
};

export default LogoutPage;
