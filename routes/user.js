const express = require('express');

const {ensureAuthenticated} = require('../config/auth')
const router = express.Router();
const userController = require('../controllers/user');
router.get('/login', userController.getLogin);

router.post('/find',userController.findLawyer);
router.post('/login',userController.postLogin);
router.get('/dashboard',ensureAuthenticated, userController.getDashboard);

router.get('/logout',userController.getLogout);

module.exports = router;