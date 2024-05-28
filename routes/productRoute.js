const express = require('express');
const {
  getReviewValidator,
  createReviewValidator,
  updateReviewValidator,
  deleteReviewValidator,
} = require('../utils/validators/reviewValidator');
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  
} = require('../services/reviewService');
const {protect, allowedTo} = require('../services/authService')
const reviewsRoute = require('./reviewRoute')
const router = express.Router();
router.use(':/productId/reviews',reviewsRoute)
router.route('/').get(protect,getReviews).post(protect,allowedTo("admin","manger"),createReviewValidator, createReview);
router
  .route('/:id')
  .get(protect, getReviewValidator, getReview)
  .put(protect,allowedTo("admin","manger"),updateReviewValidator, updateReview)
  .delete(protect,allowedTo("admin"),deleteReviewValidator, deleteReview);

module.exports = router;