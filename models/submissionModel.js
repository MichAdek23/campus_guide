const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
  faculty: { type: String, required: true },
  department: { type: String, required: true },
  year_of_admission: { type: String, required: true },
  pdf_path: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
