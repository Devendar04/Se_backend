
const Classroom = require('../models/classroom.model');

const generateAccessCode = (length = 8) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
};

exports.createClassroom = async (classroomData) => {

  let accessCode;
  let isUnique = false;

  while (!isUnique) {
    accessCode = generateAccessCode();
    const existingClassroom = await Classroom.findOne({ accessCode });
    if (!existingClassroom) isUnique = true;
  }

  const classroom = new Classroom({ ...classroomData, accessCode });
  return await classroom.save();
};


exports.getClassrooms = async () => {
  return await Classroom.find();
};

exports.getClassroomByAccessCode = async (accessCode) => {
  return await Classroom.findOne({ accessCode });
};
