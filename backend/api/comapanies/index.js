const mongoose = require('mongoose');
const { Company } = require('../../models/company');
const { sendEmail } = require('../../utils/notification');
const upload = require('../../utils/upload'); // Import the Multer configuration

// MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI;

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { companyName, description, companyId } = req.body;

    // Handle file upload (company logo)
    upload.single('logo')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading logo', error: err.message });
      }

      try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find the company by ID
        const company = await Company.findById(companyId);
        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }

        // Update company details
        company.companyName = companyName || company.companyName;
        company.description = description || company.description;

        if (req.file) {
          company.logo = req.file.path; // Store the file path of the logo
        }

        await company.save();

        // Send email to the company after update
        sendEmail(company.email, 'Company Profile Updated', 'Your company profile has been successfully updated.');

        res.status(200).json({ message: 'Company profile updated successfully', company });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
