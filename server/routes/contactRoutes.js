import express from 'express';
import rateLimit from 'express-rate-limit';
import { handleContactSubmit } from '../controllers/contactController.js';

const router = express.Router();

// Rate limiter for contact submissions to prevent service abuse or SMTP spamming
// Limit to 5 submissions per hour per unique IP address
const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // limit each IP to 5 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  handler: (req, res, next) => {
    res.status(429).json({
      success: false,
      message: 'Too many messages sent from this connection. Please try again in an hour.',
    });
  },
});

// Mount POST /contact with rate limiter middleware and submit handler
router.post('/contact', contactRateLimiter, handleContactSubmit);

export default router;
