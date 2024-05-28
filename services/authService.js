const asyncHandler = require('express-async-handler')
// eslint-disable-next-line import/no-extraneous-dependencies
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ApiError = require('../utils/ApiError')
const User = require('../models/userModel')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

const createToken= (payload)=>jwt.sign({userId:payload},"fasdfas-fasdf-afad-hrg-shaerfd-dfasdg-hgqweg-fgasd",{
        expiresIn:'90d'
    })

exports.signup= asyncHandler(
    async(req,res,next)=>{
    const user = await User.create(req.body)
    const token = createToken(user._id)
    res.status(201).json({data:user, token})
    }
    )


exports.login  = asyncHandler(
    async(req,res,next)=>{
    const {email,password} = req.body
    const user = await User.findOne({email}).select('+password')
    if(!user){
        return next(new ApiError('Invalid email or password',401))
    }
    const isMatch = await bcrypt.compare(req.body.password,user.password)
    if(!isMatch){
        return next(new ApiError('Invalid email or password',401))
    }
    const token = createToken(user._id)
    res.status(200).json({data:user, token})
    }
    
)

exports.protect = asyncHandler(
    async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
        console.log(token)
    }
    console.log(req.headers.authorization)
    if(!token){
        return next(new ApiError('Not authorized to access this route',401))
    }
    const decoded = jwt.verify(token,"fasdfas-fasdf-afad-hrg-shaerfd-dfasdg-hgqweg-fgasd")
    const user = await User.findById(decoded.userId)
    if(!user){
        return next(new ApiError('this user belong to this token does no longer exist ',401))
    }
    if(user.passwordChangeAt){
        const time =parseInt( user.passwordChangeAt.getTime()/1000, 10)
        const TokenExpiredTime = decoded.iat

        if(time > TokenExpiredTime){
            return next(new ApiError('this user recently change password please login again',401))
        }

    }
    req.user = user
    next()
    }
)

exports.allowedTo = (...roles)=>
    asyncHandler(
        async (req,res,next)=>{
            if(!roles.includes(req.user.role)){
                return next(new ApiError('you are not allowed to access this route',403))
            }
            next()
        }
    )
    
exports.ForgetPassword = asyncHandler(
    async(req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user){
        return next(new ApiError('there is no user to this email',401))
    }
    const resetCode = Math.floor(100000 + Math.random()*900000).toString()
    const resetToken = crypto.createHash('sha256').update(resetCode).digest('hex')    
        
    user.passwordResetCode = resetToken
    user.passwordResetExpiresAt = Date.now() + 600000
    user.passwordResetVerfied = false

    user.save()
    try {
        await sendEmail({email:user.email,
            subject:'password reset valid for (10 m)',
            message:`your password reset code is ${resetCode}`})
    } catch (error) {
        user.passwordResetCode = undefined
        user.passwordResetExpiresAt = undefined
        user.passwordResetVerfied = undefined
        await user.save()
        return next(new ApiError(error.message,500))
    }
    
    res.status(200)
    .json({status:'Succes',message:"Reset code sent to email"})
})
exports.verifyPassRessetCode = asyncHandler(
    async (req,res,next)=>{
        const hashedResetCode = crypto
        .createHash('sha256')
        .update(req.body.passwordResetCode)
        .digest('hex')
    const user = await User.findOne({passwordResetCode:hashedResetCode,
    passwordResetExpiresAt:{$gt:Date.now()}})
    
    if(!user){
        return next(new ApiError('invalid password reset code',401))
    }
    user.passwordResetCode = true
    await user.save()
    res.status(200)
    .json({
        status:'Succes',
        message:"password reset code verified"
    })

})

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
    return next(
        new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
    }

    if (!user.passwordResetVerified) {
    return next(new ApiError('Reset code not verified', 400));
    }

    user.password = req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetVerified = undefined;

    await user.save();

    const token = createToken(user._id);
    res.status(200).json({ token });
});