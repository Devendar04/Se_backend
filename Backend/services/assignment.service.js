const Assignment = require('../models/assignment.model');

exports.createAssignment = async (data) => {
  const { title, description, dueDate, course } = data;
  
  const assignment = new Assignment({
    title,
    description,
    dueDate,
    course,
  });

  await assignment.save();
  return assignment;
};

exports.getAssignments = async () => {
  return await Assignment.find();
};
