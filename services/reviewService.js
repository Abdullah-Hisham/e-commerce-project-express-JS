
const factory = require('./handlerrsFactory');
const review = require('../models/reviewModels');



exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.productId) filterObject = { product: req.params.productId };
    req.filterObj = filterObject;
    next();
  };


  exports.setProductIdAndUserIdToBody = (req, res, next) => {
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user._id;
    next();
  };
exports.getReviews = factory.getAll(review);


exports.getReview = factory.getOne(review);


exports.createReview = factory.createOne(review);


exports.updateReview = factory.updateOne(review);


exports.deleteReview = factory.deleteOne(review);