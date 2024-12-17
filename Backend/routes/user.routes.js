const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');
const path = require('path');

const userController = require('../controllers/user.controller'); 
const authMiddleware = require('../middleware/auth.middleware');
const checkRole = require('../middleware/checkRole.middleware');
const AssignmentController = require('../controllers/assignment.controller');
const AnnouncementController = require('../controllers/announcement.controller');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|pdf|docx/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, PDF, and DOCX files are allowed.'));
        }
    },
});

// User routes
router.post(
    '/register',
    [
        body('fullname.firstname')
            .isLength({ min: 3 })
            .withMessage('First name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    userController.registerUser
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);
router.get('/logout', authMiddleware.authUser, userController.logoutUser);

// Dashboard routes
router.get(
    '/teacher/dashboard',
    authMiddleware.authUser,
    checkRole.checkRole(['teacher']),
    (req, res) => {
        res.status(200).json({ message: 'Welcome to the teacher dashboard!' });
    }
);

router.get(
    '/student/dashboard',
    authMiddleware.authUser,
    checkRole.checkRole(['student']),
    (req, res) => {
        res.status(200).json({ message: 'Welcome to the student dashboard!' });
    }
);

// Assignment routes
router.post(
    '/teacher/assignments',
    authMiddleware.authUser,
    checkRole.checkRole(['teacher']),
    upload.single('filePath'), 
    AssignmentController.createAssignment
);

router.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Multer error: ' + err.message });
    }
    if (err) {
        return res.status(400).json({ message: 'File upload error: ' + err.message });
    }
    next();
});

router.get(
    '/student/assignments',
    AssignmentController.getAssignments
);

// Announcement routes
router.post(
    '/teacher/announcements',
    authMiddleware.authUser,
    checkRole.checkRole(['teacher']),
    upload.single('filePath'),
    AnnouncementController.createAnnouncement
);

router.get(
    '/student/announcements',
    AnnouncementController.getAnnouncements
);
// routes/classroom.routes.js

const ClassroomController = require('../controllers/classroom.controller');

router.post('/classrooms', ClassroomController.createClassroom);
router.get('/classrooms', ClassroomController.getClassrooms); 
router.get('/classrooms/:accessCode', ClassroomController.getClassroomByAccessCode); 

module.exports = router;
