const asyncHandler = require('express-async-handler')
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs')
const factory = require('./handlerrsFactory');
const User = require('../models/userModel');
const {uploadSingleImage} = require('../middleware/uploadimageMiddleware')
const ApiError = require('../utils/ApiError')

exports.uploaduserImage = uploadSingleImage("profileImg")
exports.resizeImage=asyncHandler(
    async(req,res,next)=>{
        const filename = `user-${Date.now}-${Date.now()}.jpeg`
        if(req.file){
        await sharp(req.file.buffer)
        .resize(600,600)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`upload/users/${filename}`)
        req.body.image= filename}
        next()
    }
)





exports.getusers = factory.getAll(User);


exports.getuser = factory.getOne(User);


exports.createuser = factory.createOne(User);


exports.updateuser = asyncHandler(async (req, res, next) => {
    const document = await user.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        slug: req.body.slug,
        phone:req.body.phone,
        profileImg:req.body.profileImg,
        email:req.body.email,
        role:req.body.role,

    }, {

    new: true,
    });

    if (!document) {
    return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
    );
    }
    res.status(200).json({ data: document });
});;


exports.deleteuser = factory.deleteOne(User);


exports.changeUserPassword = asyncHandler(async (req, res, next) => {
    const document = await User.findByIdAndUpdate(req.params.id,{
        password : await bcrypt.hash(req.body.password,10),
        passwordChangeAt: Date.now() 
    }, {

    new: true,
    });

    if (!document) {
    return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
    );
    }
    res.status(200).json({ data: document });
});
exports.getLoggedUserData = asyncHandler(async (req, res, next) => {
    req.params.id = req.user._id;
    next();
});
exports.updateLoggedUserPassword = asyncHandler(async (req, res, next) => {
    // 1) Update user password based user payload (req.user._id)
    const user = await User.findByIdAndUpdate(
    req.user._id,
    {
        password: await bcrypt.hash(req.body.password, 12),
        passwordChangedAt: Date.now(),
    },
    {
        new: true,
    }
    );

    // 2) Generate token
    
    const token = createToken(user._id);

    res.status(200).json({ data: user, token });
})
exports.updateLoggedUserData = asyncHandler(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
      { new: true }
    );
  
    res.status(200).json({ data: updatedUser });
  });
  
  exports.deleteLoggedUserData = asyncHandler(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user._id, { active: false });
  
    res.status(204).json({ status: 'Success' });
  });