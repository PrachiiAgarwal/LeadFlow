const express = require("express");

const {
  createLead,
  getLeads,
  updateLeadStatus,
} = require("../controllers/leadController");

const {
  protectAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

// PUBLIC
// Anyone can submit a project enquiry.
router.post("/", createLead);

// ADMIN ONLY
// Only authenticated admins can view leads.
router.get("/", protectAdmin, getLeads);

// ADMIN ONLY
// Only authenticated admins can change status.
router.patch(
  "/:id/status",
  protectAdmin,
  updateLeadStatus
);

module.exports = router;