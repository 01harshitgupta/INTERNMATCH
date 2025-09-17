import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Icon from '../components/AppIcon';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (email && !validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      setSuccess('Account created successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 1200);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4" aria-hidden="true">
            <Icon name="UserPlus" className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Set up your credentials to access the portal</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4" role="alert" aria-live="assertive">
            <div className="flex items-center">
              <Icon name="AlertCircle" className="w-5 h-5 text-red-500 mr-2" aria-hidden="true" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4" role="alert" aria-live="polite">
            <div className="flex items-center">
              <Icon name="CheckCircle2" className="w-5 h-5 text-green-600 mr-2" aria-hidden="true" />
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full border-2 border-gray-300 focus:border-blue-600 rounded-md px-3 py-2"
              aria-describedby="username-desc"
            />
            <p id="username-desc" className="sr-only">Required</p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email (optional)
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              className="w-full border-2 border-gray-300 focus:border-blue-600 rounded-md px-3 py-2"
              aria-describedby="email-desc"
            />
            <p id="email-desc" className="sr-only">Optional</p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full border-2 border-gray-300 focus:border-blue-600 rounded-md px-3 py-2"
              aria-describedby="password-desc"
            />
            <p id="password-desc" className="sr-only">Required</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full border-2 border-gray-300 focus:border-blue-600 rounded-md px-3 py-2"
              aria-describedby="confirm-password-desc"
            />
            <p id="confirm-password-desc" className="sr-only">Required</p>
          </div>

          <Button
            type="submit"
            disabled={loading || !username || !password || !confirmPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
            aria-busy={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
