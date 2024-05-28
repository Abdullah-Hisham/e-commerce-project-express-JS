const asyncHandler = require('express-async-handler')
const multer = require('multer')
const sharp = require('sharp')
const factory = require('./handlerrsFactory');
const Category = require('../models/Category');
const ApiError = require('../utils/ApiError')
const {uploadSingleImage} = require('../middleware/uploadimageMiddleware')
//const multerStorage= multer.diskStorage({
//    destination:(req,file,cb)=>{
//cb(null,'upload/categories')
//    },
//    filename:(req,file,cb)=>{
//        const ext = file.mimetype.split('/')[1]
//        cb(null, `category-${req.params.categoryId}-${Date.now()}.${ext}`)
//    },
//})
exports.uploadCategoryImage = uploadSingleImage("image")
exports.resizeImage=asyncHandler(
    async(req,res,next)=>{
        const filename = `category-${req.params.categoryId}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`upload/categories/${filename}`)
        req.body.image =filename
        next()
    }
)

exports.getCategories = factory.getAll(Category);


exports.getCategory = factory.getOne(Category);


exports.createCategory = factory.createOne(Category);


exports.updateCategory = factory.updateOne(Category);

exports.deleteCategory = factory.deleteOne(Category);