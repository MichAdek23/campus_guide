const express = require('express');
const router = express.Router();
const accessCodeController = require('../controllers/accessCodeController');

// Route to get the current access code
// This will return the current access code used for form submission
router.get('/', accessCodeController.getAccessCode);

// Route to update the access code
// This allows the admin to change the access code for form submission
router.put('/', accessCodeController.updateAccessCode);

// Route to add a new access code (optional, if you want multiple codes to exist)
// This can allow for the creation of new access codes (e.g., for different periods or for different users)
router.post('/', accessCodeController.addAccessCode);

// Route to delete an access code (optional)
// This could allow for the deletion of an access code once it is no longer needed
router.delete('/:id', accessCodeController.deleteAccessCode);

module.exports = router;
