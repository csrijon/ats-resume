import React, { useState } from 'react';
import './AuthForm.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <form className="auth-box">
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
