const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },

    budget: {
      type: String,
      required: [true, "Budget is required"],
      enum: {
        values: [
          "₹25k – ₹50k",
          "₹50k – ₹1L",
          "₹1L – ₹2L",
          "₹2L+",
        ],
        message: "Invalid budget range",
      },
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message should be at least 10 characters"],
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);