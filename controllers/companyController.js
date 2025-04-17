const { sendEmail } = require('../utils/notification');

const postJobOpening = async (req, res) => {
  const { job_title, job_description } = req.body;

  try {
    const company = await Company.findById(req.user.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const newJob = {
      job_title,
      job_description,
      company_name: company.company_name,
    };

    company.job_openings.push(newJob);
    await company.save();

    // Send email notification to all students about new job opening
    const students = await Student.find();  // Send to all students
    students.forEach(student => {
      sendEmail(student.email, 'New Job Opening', `A new job opening has been posted by ${company.company_name}. Job title: ${job_title}`);
    });

    res.status(201).json({ message: 'Job opening posted successfully', newJob });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
