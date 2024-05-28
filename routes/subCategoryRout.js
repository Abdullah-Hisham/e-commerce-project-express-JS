const express = require('express')
const  {createSubCategory,
        getSubCategories,
        getSubCategory,
        updateSubCategory,
        deleteSubCategory,
        setCategoryIdToBody
} = require('../services/subCategoryService')

const router = express.Router({mergeParams:true})
const {protect, allowedTo} = require('../services/authService')
const  {createSubCategoryValidator,
        getSubCategoryValidator,
        updateSubCategoryValidator,
        deleteSubCategoryValidator

        }= require('../utils/validators/subCategoryValidator');



        router.route('/')
        .post(protect,allowedTo('admin','manger'),setCategoryIdToBody,createSubCategoryValidator,createSubCategory)
        .get(protect,getSubCategories);
        router.route('/:id')
        .get(protect,getSubCategoryValidator,getSubCategory)
        .put(protect,allowedTo('admin','manger'),updateSubCategoryValidator,updateSubCategory)
        .delete(protect,allowedTo('admin'),deleteSubCategoryValidator,deleteSubCategory)

module.exports = router
