const mongoose = require('mongoose');
const User = require('./User'); // Import base User model

const StudentSchema = new mongoose.Schema({
  university: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  resume: {
    type: String // Store resume filename/path
  }
});

module.exports = User.discriminator('Student', StudentSchema);
