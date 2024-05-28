const express = require('express');
const {
  getBrandValidator,
  createBrandValidator,
  updateBrandValidator,
  deleteBrandValidator,
} = require('../utils/validators/brandValidator');
const {protect, allowedTo} = require('../services/authService')
const {
  getBrands,
  getBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  uploadBrandImage,
  resizeImage,
} = require('../services/brandService');
const Category = require('../models/Category');

const router = express.Router();

router.route('/').get(protect,getBrands).post(protect,allowedTo("admin","manger"),createBrandValidator, createBrand);
router
  .route('/:id')
  .get(protect, getBrandValidator, getBrand)
  .put(protect,allowedTo("admin","manger"),updateBrandValidator, updateBrand)
  .delete(protect,allowedTo("admin"),deleteBrandValidator, deleteBrand);

module.exports = router;