const asyncHandler = require('express-async-handler')
const multer = require('multer')
const sharp = require('sharp')
const factory = require('./handlerrsFactory');
const Brand = require('../models/brandModel');
const {uploadSingleImage} = require('../middleware/uploadimageMiddleware')

exports.uploadBrandImage = uploadSingleImage("image")
exports.resizeImage=asyncHandler(
    async(req,res,next)=>{
        const filename = `brand-${Date.now}-${Date.now()}.jpeg`
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`upload/categories/${filename}`)
        req.body.image= filename
        next()
    }
)





exports.getBrands = factory.getAll(Brand);


exports.getBrand = factory.getOne(Brand);


exports.createBrand = factory.createOne(Brand);


exports.updateBrand = factory.updateOne(Brand);


exports.deleteBrand = factory.deleteOne(Brand);