require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await connectDB();

    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    const name = process.env.ADMIN_NAME || "LeadFlow Admin";

    if (!email || !password) {
      console.error(
        "❌ ADMIN_EMAIL and ADMIN_PASSWORD must be provided in .env"
      );

      process.exit(1);
    }

    if (password.length < 8) {
      console.error(
        "❌ ADMIN_PASSWORD must contain at least 8 characters."
      );

      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingAdmin) {
      console.log("ℹ️ Admin account already exists.");
      process.exit(0);
    }

    const admin = await Admin.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });

    console.log("✅ LeadFlow admin created successfully.");
    console.log(`Admin email: ${admin.email}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:");
    console.error(error.message);

    process.exit(1);
  }
};

createAdmin();