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
        body: JSON.stringify({ identifier: username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }
      // Notify AuthContext so ProtectedRoute recognizes authentication
      authLogin(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      {/* Government Header */}
      <div className="absolute top-0 left-0 right-0 bg-white border-b-2 border-blue-600 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center">
              <Icon name="Shield" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-blue-900">Government of India</h1>
              <p className="text-sm text-blue-700">Ministry of Education</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 w-full max-w-md mt-16">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <Icon name="User" className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">InternMatch Portal</h2>
          <p className="text-gray-600">Official Government Login</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <Icon name="AlertCircle" className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border-2 border-gray-300 focus:border-blue-600 rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border-2 border-gray-300 focus:border-blue-600 rounded-md px-3 py-2"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          First time here?{' '}
          <Link to="/signup" className="text-blue-700 font-semibold hover:underline">Create an account</Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            This is an official Government of India portal
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
