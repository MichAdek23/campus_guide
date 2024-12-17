const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Submission } = require('../models/submissionModel');

// Set up file storage configuration with multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { faculty, department, year_of_admission } = req.body;
    const dir = path.join(__dirname, `../../storage/${faculty}/${department}/${year_of_admission}`);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${req.body.name}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

// Upload endpoint
exports.uploadFile = upload.single('file');  // File upload handler for a single file

// File retrieval endpoint
exports.getFiles = async (req, res) => {
  const { faculty, department, year_of_admission } = req.params;
  const dirPath = path.join(__dirname, `../../storage/${faculty}/${department}/${year_of_admission}`);
  
  fs.readdir(dirPath, (err, files) => {
    if (err) return res.status(500).json({ message: 'Error reading files' });
    res.json({ files });
  });
};

// File deletion endpoint
exports.deleteFile = async (req, res) => {
  const { faculty, department, year_of_admission, fileName } = req.params;
  const filePath = path.join(__dirname, `../../storage/${faculty}/${department}/${year_of_admission}`, fileName);

  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ message: 'Error deleting file' });
    res.json({ message: 'File deleted successfully' });
  });
};
