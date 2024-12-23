const mongoose = require('mongoose');

const accessCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true }, // Unique access code
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = mongoose.model('AccessCode', accessCodeSchema);
