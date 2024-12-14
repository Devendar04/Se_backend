const Announcement = require('../models/announcement.model');

exports.createAnnouncement = async (data) => {
  const { title, message, postedBy } = data;
  
  const announcement = new Announcement({
    title,
    message,
    postedBy,
  });

  await announcement.save();
  return announcement;
};

exports.getAnnouncements = async () => {
  return await Announcement.find();
};
