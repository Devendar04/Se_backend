const Announcement = require('../models/announcement.model');

exports.createAnnouncement = async (data) => {
  const { title, message,filePath, postedBy } = data;
  
  const announcement = new Announcement({
    title,
    message,
    filePath,
    postedBy,
  });

  await announcement.save();
  return announcement;
};

exports.getAnnouncements = async () => {
  return await Announcement.find();
};
