import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5000/api/AuthPass', {
        username,
        password
      }, { withCredentials: true }); // Send cookies
      // After success, open main app
      window.location.href = 'http://localhost:5000/main';
    } catch (err) {
      console.error('Login failed:', err);
      alert('Login failed');
    }
  };

  return (
    <div style={{ padding: '20px', cell: 'center', maxWidth: '300px', margin: 'auto', textAlign: 'center' }}>
      <h1>Login</h1>
      <input onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin} style={{ display: 'block', margin: '20px auto' }}>Login</button>
    </div>
  );
}

export default LoginPage;