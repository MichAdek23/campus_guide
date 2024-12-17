const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const router = express.Router();

// Multer configuration (for image upload)
const upload = multer({ dest: 'uploads/' });

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Handle form submissions (POST request to '/api/submissions')
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { facultyId, departmentId, lastname, firstname, yearOfAdmission } = req.body;

    // Check if all required fields are provided
    if (!facultyId || !departmentId || !lastname || !firstname || !yearOfAdmission) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create the directory structure for storing the submission files
    const directoryPath = path.join(__dirname, '../uploads', facultyId, departmentId, yearOfAdmission);
    fs.mkdirSync(directoryPath, { recursive: true });

    // Generate the PDF file name and path
    const pdfFileName = `${lastname}_${firstname}_${yearOfAdmission}.pdf`;
    const pdfPath = path.join(directoryPath, pdfFileName);

    // Create the PDF document
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(pdfPath));
    doc.fontSize(16).text(`Submission for ${firstname} ${lastname}`, { underline: true });
    doc.text(`Faculty: ${facultyId}`);
    doc.text(`Department: ${departmentId}`);
    doc.text(`Year of Admission: ${yearOfAdmission}`);

    // If an image file is uploaded, process it
    if (req.file) {
      const uniqueName = Date.now() + path.extname(req.file.originalname); // Create unique name for the image
      const imagePath = path.join(directoryPath, uniqueName);
      fs.renameSync(req.file.path, imagePath); // Rename and move the image to the correct location
      doc.image(imagePath, { fit: [200, 200], align: 'center', valign: 'center' }); // Add image to PDF
    }

    doc.end(); // Finalize the PDF

    res.json({ message: 'Submission saved successfully!', pdfPath });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'An error occurred.', error: error.message });
  }
});

module.exports = router;
