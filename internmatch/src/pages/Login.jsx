import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Icon from '../components/AppIcon';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      authLogin(data.user, data.token);
      navigate('/profile-creation-form');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-indigo-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Government Header */}
      <header
        className="absolute top-0 left-0 right-0 bg-white/95 backdrop-blur-md border-b-2 border-indigo-600 shadow-lg z-10"
        aria-label="Government Header"
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg"
              aria-hidden="true"
            >
              <Icon name="Shield" className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 bg-clip-text text-transparent">Government of India</h1>
              <p className="text-sm text-indigo-700 font-medium">Ministry of Corporate Affairs</p>
            </div>
          </div>
        </div>
      </header>

      <main
        className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 sm:p-8 w-full max-w-md mt-20 relative z-10"
        role="main"
        tabIndex={-1}
      >
        <div className="text-center mb-8">
          <div
            className="mx-auto w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
            aria-hidden="true"
          >
            <Icon name="User" className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-3">InternMatch Portal</h2>
          <p className="text-gray-600 font-medium">Official Government Login</p>
        </div>

        {error && (
          <div
            className="bg-red-50/90 backdrop-blur-sm border border-red-200 rounded-xl p-4 mb-6 shadow-lg"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-center">
              <Icon
                name="AlertCircle"
                className="w-5 h-5 text-red-500 mr-3"
                aria-hidden="true"
              />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-3">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'error-message' : undefined}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border-2 border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-200"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'error-message' : undefined}
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            aria-busy={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          First time here?{' '}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:text-purple-600 hover:underline transition-colors duration-200">
            Create an account
          </Link>
        </div>

        <footer className="mt-8 text-center">
          <p className="text-xs text-gray-500 bg-gray-50/50 rounded-lg py-2 px-4">This is an official Government of India portal</p>
        </footer>
      </main>
    </div>
  );
};

export default Login;
