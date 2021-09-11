// Library import
const express = require('express');
// Controller import
const AuthController = require('../controllers/auth');
// Middleware import
const auth = require('../middlewares/auth/auth');
const uploadHelpers = require('../middlewares/libraries/uploadHelpers');
// Router instance
const router = express.Router();
// Auth routers
router.post('/register',AuthController.register);
router.post('/login',AuthController.login);
router.get('/profile',auth.getAccessToRoute,AuthController.getUser);
router.get('/logout',auth.getAccessToRoute,AuthController.logout);
router.post('/upload',auth.getAccessToRoute,uploadHelpers.profilePhotoUpload.single("image"),AuthController.upload);
router.post('/forgotpassword',AuthController.forgotPassword);

module.exports = router;