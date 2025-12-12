const mongoose = require('mongoose');

// Define the ProjectLog schema with required fields: title, description, status
const projectLogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'InProgress', 'Complete'],
      default: 'Pending',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the ProjectLog model
const ProjectLog = mongoose.model('ProjectLog', projectLogSchema);

module.exports = ProjectLog;
