import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  function handleLogin() {
    login('demo-user');
    navigate(from, { replace: true });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <p>Click the button to simulate login.</p>
      <button onClick={handleLogin}>Log in</button>
    </div>
  );
}
