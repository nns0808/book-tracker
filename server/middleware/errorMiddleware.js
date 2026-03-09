const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(e => e.message);

    return res.status(400).json({
      message: "Validation failed",
      errors: messages,
    });
  }

  res.status(500).json({
    message: "Server error",
  });
};

export default errorHandler;
