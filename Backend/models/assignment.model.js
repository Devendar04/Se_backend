const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  course: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;
