const Assignment = require('../models/assignment.model');

exports.createAssignment = async (data) => {
  const { title, description,filePath, dueDate, course } = data;
  
  const assignment = new Assignment({
    title,
    description,
    dueDate,
    filePath,
    course,
  });

  await assignment.save();
  return assignment;
};

exports.getAssignments = async () => {
  return await Assignment.find();
};
