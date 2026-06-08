import { sendMail } from '../utils/mailSender.js';
import Contact from '../models/Contact.js';
import { AppError } from '../middleware/errorHandler.js';

// RFC 5322 compliant simple email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Controller to handle contact form submissions.
 * Validates inputs, saves to MongoDB, and dispatches SMTP email notification.
 */
export const handleContactSubmit = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Inputs validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return next(new AppError('Name is required', 400));
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return next(new AppError('Email is required', 400));
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return next(new AppError('Please use a valid email address', 400));
    }
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return next(new AppError('Subject is required', 400));
    }
    if (!message || typeof message !== 'string' || !message.trim()) {
      return next(new AppError('Message is required', 400));
    }

    const sanitizedName = name.trim();
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedSubject = subject.trim();
    const sanitizedMessage = message.trim();

    // 2. Persist contact information to Database
    const newContact = new Contact({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    });
    await newContact.save();

    // 3. Dispatch styled email notification
    await sendMail({
      name: sanitizedName,
      email: sanitizedEmail,
      subject: sanitizedSubject,
      message: sanitizedMessage,
    });

    // 4. Return success response
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error(error);
    
    // Check for mongoose validation error specifically
    if (error.name === 'ValidationError') {
      const errorMsg = Object.values(error.errors).map(val => val.message).join(', ');
      return next(new AppError(errorMsg, 400));
    }
    
    // Generic controller failure error handler
    return next(new AppError('Email delivery failed', 500));
  }
};
