const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../middleware/auth'); // Corrected path

// Routes for Register and Login
router.get('/register', auth.isLogin, userController.loadRegister); // Ensure logged-out users can register
router.post('/register', userController.registerUser); // Register User

router.get('/login', auth.isLogin, userController.loadLogin); // Ensure logged-out users can log in
router.post('/login', userController.login); // Login User

router.get('/home', auth.CheckSession, userController.loadHome); // Home is protected by session check

router.post('/logout',auth.CheckSession,userController.logout);
module.exports = router;
