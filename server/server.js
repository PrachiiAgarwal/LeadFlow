require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const leadRoutes = require("./routes/leadRoutes");
const authRoutes = require("./routes/authRoutes");

const errorHandler = require("./middleware/errorHandler");

const app = express();

connectDB();

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  express.json({
    limit: "1mb",
  })
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LeadFlow API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on port ${PORT}`
  );
});