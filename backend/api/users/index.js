const mongoose = require('mongoose');
const { User } = require('../../models/user');
const { sendEmail } = require('../../utils/notification');
const upload = require('../../utils/upload'); // Import the Multer configuration

// MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI;

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, email, role, userId } = req.body;

    // Handle file upload (profile image)
    upload.single('profileImage')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading profile image', error: err.message });
      }

      try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Update user details
        user.username = username || user.username;
        user.email = email || user.email;
        user.role = role || user.role;

        if (req.file) {
          user.profileImage = req.file.path; // Store the file path of the profile image
        }

        await user.save();

        // Send email notification to the user after profile update
        sendEmail(user.email, 'Profile Updated', 'Your profile has been successfully updated.');

        res.status(200).json({ message: 'User profile updated successfully', user });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
