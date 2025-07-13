import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to the Main Page!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
