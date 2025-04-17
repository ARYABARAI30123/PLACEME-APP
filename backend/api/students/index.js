const mongoose = require('mongoose');
const { Student } = require('../../models/student');
const { sendEmail } = require('../../utils/notification');
const upload = require('../../utils/upload'); // Import the Multer configuration

// MongoDB URI from environment variable
const mongoURI = process.env.MONGO_URI;

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { university, skills, studentId } = req.body;

    // Handle file upload (single file upload)
    upload.single('resume')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err.message });
      }

      try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

        const student = await Student.findById(studentId);
        if (!student) {
          return res.status(404).json({ message: 'Student not found' });
        }

        // Update student details
        student.university = university || student.university;
        student.skills = skills || student.skills;

        if (req.file) {
          student.resume = req.file.path; // Store the file path in the student document
        }

        await student.save();

        // Send email to the student after update
        sendEmail(student.email, 'Profile Updated', 'Your profile has been successfully updated.');

        res.status(200).json({ message: 'Profile updated successfully', student });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
