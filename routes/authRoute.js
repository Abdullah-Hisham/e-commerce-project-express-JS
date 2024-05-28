const express = require('express');


const {signupValidator, loginValidator
    
} = require('../utils/validators/authValidator')
const {
    signup, login, ForgetPassword, verifyPassRessetCode
    
} = require('../services/authService');

const router = express.Router();
router.route('/signup').post(signupValidator,signup)
router.route('/login').post(loginValidator,login)
router.post('/forgotpassword',ForgetPassword)
router.post('/verfiyReserCode',verifyPassRessetCode)
module.exports = router;
