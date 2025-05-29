const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT secret (in production, use environment variable)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Signup route
router.post('/signup',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create new user
      const user = await User.create({ email, password });
      
      // Generate token
      const token = generateToken(user.id);

      res.status(201).json({
        message: 'User created successfully',
        user: { id: user.id, email: user.email },
        token
      });
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// Login route
router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
  ],
  async (req, res) => {
    try {
      // Check validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Check if user signed up with OAuth
      if (user.auth_provider !== 'email') {
        return res.status(401).json({ 
          error: `Please login with ${user.auth_provider}` 
        });
      }

      // Verify password
      const isValidPassword = await User.verifyPassword(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate token
      const token = generateToken(user.id);

      res.json({
        message: 'Login successful',
        user: { 
          id: user.id, 
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

// OAuth callback route
router.post('/oauth/callback', async (req, res) => {
  try {
    const { provider, providerId, email, firstName, lastName, profilePicture } = req.body;

    if (!provider || !providerId || !email) {
      return res.status(400).json({ error: 'Missing required OAuth data' });
    }

    // Check if user exists with this OAuth provider
    let user = await User.findByOAuthProvider(provider, providerId);

    if (!user) {
      // Check if user exists with this email
      user = await User.findByEmail(email);

      if (user) {
        // User exists with email but different auth method
        if (user.auth_provider !== provider) {
          return res.status(400).json({ 
            error: `Email already registered with ${user.auth_provider}` 
          });
        }
      } else {
        // Create new user
        user = await User.create({
          email,
          authProvider: provider,
          authProviderId: providerId,
          firstName,
          lastName,
          profilePicture,
          linkedinProfile: provider === 'linkedin' ? providerId : null
        });
      }
    }

    // Generate token
    const token = generateToken(user.id);

    res.json({
      message: 'OAuth login successful',
      user: { 
        id: user.id, 
        email: user.email,
        firstName: user.first_name || firstName,
        lastName: user.last_name || lastName
      },
      token
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify token route
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    res.json({
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router; 