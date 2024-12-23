const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    middlename: { type: String },
    lastname: { type: String, required: true },
    faculty: { type: String, required: true },
    department: { type: String, required: true },
    year_of_admission: { type: String, required: true },
    matNumber: { type: String, required: true }, // Added matriculation number
    phoneNumber: { type: String, required: true }, // Added phone number
    jambRegNumber: { type: String, required: true }, // Added JAMB registration number
    pdf_path: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Submission', submissionSchema);
