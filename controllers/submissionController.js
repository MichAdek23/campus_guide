// controllers/submissionController.js
const Submission = require('../models/submissionModel');

// Submit form data
exports.submitData = async (req, res) => {
  try {
    const { faculty, department, year_of_admission, files } = req.body;

    // Handle file saving logic if necessary
    const newSubmission = new Submission({
      faculty,
      department,
      year_of_admission,
      files, // Assuming 'files' is part of the form data
    });

    await newSubmission.save();
    res.status(201).json({ message: 'Submission successful', submission: newSubmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting data' });
  }
};

// Get submissions based on faculty, department, and year of admission
exports.getSubmissions = async (req, res) => {
  try {
    const { faculty, department, year_of_admission } = req.params;

    const submissions = await Submission.find({ faculty, department, year_of_admission });
    
    if (submissions.length === 0) {
      return res.status(404).json({ message: 'No submissions found' });
    }

    res.status(200).json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving submissions' });
  }
};
