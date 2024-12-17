const AccessCode = require('../models/AccessCode'); // Assuming you have a model for access codes

// Get the current access code (you might store this in a single document)
const getAccessCode = async (req, res) => {
  try {
    const accessCode = await AccessCode.findOne(); // Assuming you store a single access code
    if (!accessCode) {
      return res.status(404).json({ message: 'Access code not found.' });
    }
    res.json(accessCode);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve access code.', error: error.message });
  }
};

// Update the current access code
const updateAccessCode = async (req, res) => {
  try {
    const { code } = req.body; // Expecting the new code in the request body
    if (!code) {
      return res.status(400).json({ message: 'Access code is required.' });
    }

    const accessCode = await AccessCode.findOne(); // Find the existing access code document
    if (!accessCode) {
      return res.status(404).json({ message: 'Access code not found.' });
    }

    accessCode.code = code; // Update the access code
    await accessCode.save(); // Save the updated access code

    res.json({ message: 'Access code updated successfully.', accessCode });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update access code.', error: error.message });
  }
};

// Add a new access code (optional)
const addAccessCode = async (req, res) => {
  try {
    const { code } = req.body; // Expecting the new code in the request body
    if (!code) {
      return res.status(400).json({ message: 'Access code is required.' });
    }

    // Create and save the new access code
    const newAccessCode = new AccessCode({ code });
    await newAccessCode.save();

    res.status(201).json({ message: 'New access code added successfully.', newAccessCode });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add access code.', error: error.message });
  }
};

// Delete an access code (optional, if you want to support removing access codes)
const deleteAccessCode = async (req, res) => {
  try {
    const { id } = req.params; // Access code ID to delete
    const accessCode = await AccessCode.findByIdAndDelete(id);

    if (!accessCode) {
      return res.status(404).json({ message: 'Access code not found.' });
    }

    res.json({ message: 'Access code deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete access code.', error: error.message });
  }
};

module.exports = {
  getAccessCode,
  updateAccessCode,
  addAccessCode,
  deleteAccessCode
};
