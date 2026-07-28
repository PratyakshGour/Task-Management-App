import React, { useState } from 'react';
import { api } from '../services/api';

export const AuthView = ({ onLoginSuccess, addToast }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeTab === 'login') {
        if (!formData.username || !formData.password) {
          throw new Error('Please fill in both username and password.');
        }
        const res = await api.login(formData.username, formData.password);
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          addToast('Welcome back! Successfully logged in.', 'success');
          onLoginSuccess(res.token);
        }
      } else {
        if (!formData.name || !formData.username || !formData.email || !formData.password) {
          throw new Error('Please fill in all registration fields.');
        }
        await api.register(formData.name, formData.username, formData.email, formData.password);
        addToast('Account created successfully! Please log in.', 'success');
        setActiveTab('login');
        setFormData((prev) => ({ ...prev, password: '' }));
      }
    } catch (err) {
      addToast(err.message || 'Authentication failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper animate-fade-in">
      <div className="auth-card glass-card">
        <div className="auth-header">
          <h2>
            {activeTab === 'login' ? 'Welcome ' : 'Join '}
            <span className="gradient-text">TaskPulse</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {activeTab === 'login' 
              ? 'Enter your credentials to access your dashboard' 
              : 'Create your premium workspace today'}
          </p>
        </div>

        <div className="auth-tabs">
          <button 
            type="button"
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button 
            type="button"
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <>
              <div className="input-group">
                <label className="input-label" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={handleChange}
                  required={activeTab === 'register'}
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required={activeTab === 'register'}
                />
              </div>
            </>
          )}

          <div className="input-group">
            <label className="input-label" htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              className="form-input" 
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="input-label" htmlFor="password">Password</label>
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ fontSize: '0.75rem', color: 'var(--text-accent)', fontWeight: 600 }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} 
              id="password" 
              name="password" 
              className="form-input" 
              placeholder="••••••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ width: '100%', marginTop: '0.75rem', padding: '1rem' }}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
