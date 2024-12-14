const AssignmentService = require('../services/assignment.service');

exports.createAssignment = async (req, res) => {
  try {
    const newAssignment = await AssignmentService.createAssignment(req.body);
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAssignments = async (req, res) => {
  try {
    const assignments = await AssignmentService.getAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
