const express = require('express');
const router = express.Router();
const {body,validationResult} = require('express-validator')
const userController = require('../controllers/user.controller'); 

router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:8}).withMessage('password must be at least 8 characters long')
],

    userController.registerUser
)

module.exports = router;