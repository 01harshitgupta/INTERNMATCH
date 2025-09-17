const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const authService = require('../services/authService');
const userService = require('../services/userService');

const router = express.Router();

// Rate limiting for auth endpoints
const authLimiter = require('express-rate-limit')({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

// Send OTP to email
router.post('/send-otp', authLimiter, async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const result = await authService.sendOTP(email);
    
    if (result.success) {
      res.json({ 
        message: 'OTP sent successfully',
        sessionId: result.sessionId 
      });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
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
