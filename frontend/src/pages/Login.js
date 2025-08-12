
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSideImage } from '../assets/loginSideImage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-split-root">
      {/* Left Side - Image and Branding */}
      <div className="login-split-left">
        <img src={loginSideImage} alt="Dashboard" style={{
          width: '80%',
          maxWidth: 400,
          borderRadius: 24,
          boxShadow: '0 8px 32px #0004',
          marginBottom: 32,
        }} />
        <h1 style={{ fontWeight: 800, fontSize: '2.2rem', marginBottom: 12, letterSpacing: 1 }}>CSInfoTech</h1>
        <h3 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: 16, color: '#b2b6d6' }}>Easy to use Dashboard</h3>
        <p style={{ color: '#b2b6d6', maxWidth: 340, textAlign: 'center', fontSize: '1rem' }}>
          Choose the best of product/services and get a bare metal server at the lowest prices.
        </p>
      </div>
      {/* Right Side - Login Form */}
      <div className="login-split-right">
        <div className="login-form-card">
          <h2 style={{
            color: '#181c3a',
            fontWeight: 800,
            fontSize: '1.7rem',
            marginBottom: 28,
            textAlign: 'center',
            letterSpacing: 1,
          }}>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                border: '1.5px solid #e0e7ff',
                borderRadius: 10,
                fontSize: '1rem',
                padding: '14px 16px',
                background: '#f8faff',
                boxShadow: 'none',
              }}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                border: '1.5px solid #e0e7ff',
                borderRadius: 10,
                fontSize: '1rem',
                padding: '14px 16px',
                background: '#f8faff',
                boxShadow: 'none',
              }}
            />
            <button
              type="submit"
              className="btn w-100"
              style={{
                background: 'linear-gradient(90deg, #6a89cc 0%, #38d39f 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.1rem',
                borderRadius: 10,
                padding: '12px 0',
                marginTop: 8,
                boxShadow: '0 2px 8px #6a89cc22',
                border: 'none',
                letterSpacing: 1,
              }}
            >
              Login
            </button>
          </form>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
