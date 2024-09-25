import React, { useState } from 'react';
import { registerUser, loginUser } from '../utils/api';  // Import Axios functions

const AuthForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { token } = await loginUser({ email: formData.email, password: formData.password });
        localStorage.setItem('token', token);  // Save the JWT token
        console.log('Login successful. Token:', token);
      } else {
        const userData = await registerUser(formData);
        console.log('User registered successfully:', userData);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {!isLogin && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>

      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? 'Switch to Register' : 'Switch to Login'}
      </button>

      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </form>
  );
};

export default AuthForm;
