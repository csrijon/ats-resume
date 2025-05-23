import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate()
  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handelsubmit = (e) => {
    e.preventDefault()
    navigate("/Home")
  }
  

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handelsubmit} >
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>

        <input
          type="email"
          placeholder="Email"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
          />
        )}

        <button type="submit">
          {isLogin ? 'Login' : 'Signup'}
        </button>

        <p className="toggle-link" onClick={handleToggle}>
          {isLogin
            ? "Don't have an account? Signup"
            : 'Already have an account? Login'}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
