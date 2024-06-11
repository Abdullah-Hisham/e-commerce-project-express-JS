const express = require('express');
const {getRevenu,getRevenuByDate} = require('../services/getRevenuServices');
const authService = require('../services/authService');

const router = express.Router();

router.use(authService.protect,authService.allowedTo('admin'))



router.get('/',getRevenu)

router.get('/permonth',getRevenuByDate)


module.exports = router