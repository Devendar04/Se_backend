// models/classroom.model.js
const mongoose = require('mongoose');

const classroomSchema = new mongoose.Schema({
  className: { type: String, required: true },
  section: { type: String, required: true },
  subject: { type: String, required: true },
  room: { type: String, required: true },
  accessCode: { type: String, unique: true, required: true }, // Unique code for access
}, { timestamps: true });

module.exports = mongoose.model('Classroom', classroomSchema);
