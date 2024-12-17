const ClassroomService = require('../services/classroom.service');

exports.createClassroom = async (req, res) => {
  try {
    const { className, section, subject, room } = req.body;

    if (!className || !section || !subject || !room) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const classroom = await ClassroomService.createClassroom({
      className,
      section,
      subject,
      room,
    });

    res.status(201).json({ message: 'Classroom created successfully', classroom });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassrooms = async (req, res) => {
  try {
    const classrooms = await ClassroomService.getClassrooms();
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getClassroomByAccessCode = async (req, res) => {
  try {
    const { accessCode } = req.params;

    const classroom = await ClassroomService.getClassroomByAccessCode(accessCode);

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }

    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
