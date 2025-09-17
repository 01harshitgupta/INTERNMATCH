const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const authService = require('../services/authService');
const userService = require('../services/userService');
const credentialService = require('../services/credentialService');

const router = express.Router();

// Rate limiting for auth endpoints
const rateLimit = require('express-rate-limit');
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' ? 1000 : 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many authentication attempts, please try again later.' },
  skip: () => process.env.NODE_ENV === 'development'
});

// Signup (first-time user) - username, email, password
router.post('/signup', authLimiter, async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Create user profile (if not exists)
    let user = await userService.findUserByEmail(email) || await userService.findUserByPhone(username);
    if (!user) {
      user = await userService.createUser({
        id: require('uuid').v4(),
        phoneNumber: undefined,
        name: name || username,
        email: email || undefined,
        createdAt: new Date().toISOString()
      });
    }

    // Create credentials
    await credentialService.createCredential({
      userId: user.id,
      username,
      email,
      passwordPlain: password
    });

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ error: error.message || 'Signup failed' });
  }
});

// Login - username/email + password
router.post('/login', authLimiter, async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be username or email

    if (!identifier || !password) {
      return res.status(400).json({ error: 'Identifier and password are required' });
    }

    const cred = await credentialService.verifyPassword(identifier, password);
    if (!cred) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Load user profile
    const user = await userService.findUserById(cred.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, username: cred.username, email: cred.email || null },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email || null,
        username: cred.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Verify OTP and create/login user
router.post('/verify-otp', authLimiter, async (req, res) => {
  try {
    const { email, otp, sessionId, name } = req.body;

    if (!email || !otp || !sessionId) {
      return res.status(400).json({ error: 'Email, OTP, and session ID are required' });
    }

    const verificationResult = await authService.verifyOTP(email, otp, sessionId);
    
    if (!verificationResult.success) {
      return res.status(400).json({ error: verificationResult.error });
    }

    // Check if user exists, if not create new user
    let user = await userService.findUserByEmail(email);
    
    if (!user) {
      // Create new user
      user = await userService.createUser({
        id: uuidv4(),
        email,
        name: name || 'User',
        createdAt: new Date().toISOString()
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// Logout (client-side token removal, but we can add token blacklisting here)
router.post('/logout', (req, res) => {
  // In a more sophisticated setup, you'd add the token to a blacklist
  res.json({ message: 'Logged out successfully' });
});

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Get current user info
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await userService.findUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        phoneNumber: user.phoneNumber,
        name: user.name,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user information' });
  }
});

module.exports = router;
