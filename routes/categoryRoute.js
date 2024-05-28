const express = require('express');
const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
} = require('../utils/validators/categoryValidator');

const {protect, allowedTo} = require('../services/authService')
const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    uploadCategoryImage,
    resizeImage,
} = require('../services/categoryService');
const subCategoryRoute = require('./subCategoryRout')

const router = express.Router();


router.use('/:categoryId/subcategories',subCategoryRoute)
router
    .route('/')
    .get(protect,getCategories)
    .post(protect
        ,allowedTo('admin','manger')
        ,uploadCategoryImage
        ,resizeImage
        ,createCategoryValidator
        ,createCategory);
router
    .route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(protect
        ,allowedTo('admin','manger')
        , uploadCategoryImage,resizeImage,updateCategoryValidator, updateCategory)
    .delete(protect,
        allowedTo('admin'),
        deleteCategoryValidator,
        deleteCategory);

module.exports = router;