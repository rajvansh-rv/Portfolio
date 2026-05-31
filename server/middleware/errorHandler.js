/**
 * Custom error class representing operational or client-side errors.
 */
export class AppError extends Error {
  /**
   * @param {string} message - Error description
   * @param {number} statusCode - HTTP status code
   */
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Global Express error handling middleware.
 */
export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log non-operational (internal server) errors for developers
  if (err.statusCode === 500) {
    console.error('💥 SYSTEM ERROR:', err);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message || 'Failed to send message'
  });
};
