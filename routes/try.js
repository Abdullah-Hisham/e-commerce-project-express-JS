const express = require('express');
const authService = require('../services/authService');

const router = express.Router({ mergeParams: true });



router.route('/').get(authService.protect, authService.allowedTo('admin'),(req, res) => {
  res.send(true);
});

module.exports = router;
