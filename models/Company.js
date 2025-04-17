const mongoose = require('mongoose');
const User = require('./User'); // Import base User model

const CompanySchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true
  },
  job_openings: {
    type: [String],
    required: true
  }
});

module.exports = User.discriminator('Company', CompanySchema);
