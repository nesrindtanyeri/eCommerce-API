// middleware/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Print error details to the console

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'An error occurred on the server',
  });
};

export default errorHandler;

  