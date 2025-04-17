const { sendEmail } = require('../utils/notification');

const updateProfile = async (req, res) => {
  const { university, skills } = req.body;

  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.university = university || student.university;
    student.skills = skills || student.skills;

    if (req.file) {
      student.resume = req.file.path;
    }

    await student.save();

    // Send email notification to the student about profile update
    sendEmail(student.email, 'Profile Updated', 'Your profile has been successfully updated.');

    res.json({ message: 'Profile updated successfully', student });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
