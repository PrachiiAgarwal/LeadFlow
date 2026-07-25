const mongoose = require("mongoose");
const Lead = require("../models/Lead");

const allowedBudgets = [
  "₹25k – ₹50k",
  "₹50k – ₹1L",
  "₹1L – ₹2L",
  "₹2L+",
];

const allowedStatuses = ["New", "Contacted", "Closed"];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/*
========================================
CREATE LEAD
POST /api/leads
========================================
*/

const createLead = async (req, res, next) => {
  try {
    let { name, email, budget, message } = req.body;

    // Validate field types
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof budget !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input data.",
      });
    }

    // Trim values
    name = name.trim();
    email = email.trim().toLowerCase();
    budget = budget.trim();
    message = message.trim();

    // Name validation
    if (name.length < 2) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid name.",
      });
    }

    // Email validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email.",
      });
    }

    // Budget validation
    if (!allowedBudgets.includes(budget)) {
      return res.status(400).json({
        success: false,
        message: "Please select a valid budget range.",
      });
    }

    // Message validation
    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide some details about your project.",
      });
    }

    const lead = await Lead.create({
      name,
      email,
      budget,
      message,
      status: "New",
    });

    res.status(201).json({
      success: true,
      message: "Lead submitted successfully.",
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

/*
========================================
GET LEADS
GET /api/leads
GET /api/leads?search=value
========================================
*/

const getLeads = async (req, res, next) => {
  try {
    const search = req.query.search?.trim();

    let query = {};

    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { message: { $regex: search, $options: "i" } },
        ],
      };
    }

    const leads = await Lead.find(query).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: leads.length,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

/*
========================================
UPDATE STATUS
PATCH /api/leads/:id/status
========================================
*/

const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lead ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status.",
      });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Status updated successfully.",
      data: updatedLead,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLeadStatus,
};