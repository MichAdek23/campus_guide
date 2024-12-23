const Submission = require('../models/submissionModel');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');

// Submit form data, including file upload
exports.submitData = async (req, res) => {
  try {
    const {
      facultyId, departmentId, firstname, lastname, yearOfAdmission, 
      matNumber, phoneNumber, jambRegNumber
    } = req.body;

    // Check if all required fields are provided
    if (
      !facultyId ||
      !departmentId ||
      !firstname ||
      !lastname ||
      !yearOfAdmission ||
      !matNumber ||
      !phoneNumber ||
      !jambRegNumber
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Handle PDF file creation if necessary
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Generate PDF
    const pdfFileName = `${lastname}_${firstname}_${yearOfAdmission}.pdf`;
    const pdfPath = path.join(uploadDir, pdfFileName);
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));

    doc.fontSize(16).text(`Submission for ${firstname} ${lastname}`, { underline: true });
    doc.text(`Faculty: ${facultyId}`);
    doc.text(`Department: ${departmentId}`);
    doc.text(`Year of Admission: ${yearOfAdmission}`);
    doc.text(`Matriculation Number: ${matNumber}`);
    doc.text(`Phone Number: ${phoneNumber}`);
    doc.text(`JAMB Registration Number: ${jambRegNumber}`);
    
    doc.end(); // Finalize the PDF

    // Create a new submission
    const newSubmission = new Submission({
      firstname,
      lastname,
      faculty: facultyId,
      department: departmentId,
      year_of_admission: yearOfAdmission,
      matNumber,
      phoneNumber,
      jambRegNumber,
      pdfPath: pdfPath || '', // Add a fallback for pdfPath
    });

    await newSubmission.save();
    res.status(201).json({ message: 'Submission successful', submission: newSubmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting data' });
  }
};


