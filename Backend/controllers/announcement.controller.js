const AnnouncementService = require('../services/announcement.service');

exports.createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = await AnnouncementService.createAnnouncement(req.body);
    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await AnnouncementService.getAnnouncements();
    res.status(200).json(announcements);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
