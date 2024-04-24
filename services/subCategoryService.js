const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/ApiError');
const subCategory = require('../models/subCategoryModel');

exports.createSubCategory = asyncHandler(async (req, res) => {
    const {name , category} = req.body;
    const subcategory = await subCategory.create({ name,
    slug: slugify(name),
    category});
    res.status(201).json({ data: subcategory });
});

exports.getsubCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const subcategories = await subCategory.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: subcategories.length, page, data: subcategories });
});


exports.getsubCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const subcategory = await subCategory.findById(id);
    if (!subcategory) {
    return next(new ApiError(`No category for this id ${id}`, 404));
    }
    res.status(200).json({ data: subcategory });
});