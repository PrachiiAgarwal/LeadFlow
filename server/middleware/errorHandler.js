const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      error: err.message,
    }),
  });
};

module.exports = errorHandler;