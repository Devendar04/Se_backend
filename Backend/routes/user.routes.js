const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller'); 
const authMiddleware = require('../middleware/auth.middleware');
const checkRole = require('../middleware/checkRole.middleware');
const AssignmentController = require('../controllers/assignment.controller');
const AnnouncementController = require('../controllers/announcement.controller');


router.post(
    '/register',
    [
        body('fullname.firstname')
            .isLength({ min: 3 })
            .withMessage('First name must be at least 3 characters long'),
        body('email')
            .isEmail()
            .withMessage('Invalid email'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    userController.registerUser
);


router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Invalid email'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ],
    userController.loginUser
);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

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

router.post('/teacher/assignments', AssignmentController.createAssignment);
router.get('/student/assignments', AssignmentController.getAssignments);

router.post('/teacher/announcements', AnnouncementController.createAnnouncement);
router.get('/student/announcements', AnnouncementController.getAnnouncements);


module.exports = router;