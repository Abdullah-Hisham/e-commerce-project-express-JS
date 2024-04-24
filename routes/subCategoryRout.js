const express = require('express')
const  {createSubCategory,
        getsubCategories,
        getsubCategory,
        
} = require('../services/subCategoryService')

const router = express.Router()

const {createSubCategoryValidator}= require('../utils/validators/subCategoryValidator')
const { getCategories } = require('../services/categoryService')


router.route('/').post(createSubCategoryValidator,createSubCategory).
get(getsubCategories)

router.route('/:id').get(getsubCategory)

module.exports = router
