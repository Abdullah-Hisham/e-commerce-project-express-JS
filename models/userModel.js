const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required:[true , 'name required'],
            unique : [true , 'name must be unique'],
            minlength :[3 , 'Too short name'],
            maxlenght : [32 , 'Too long']
        },
        slug:{
            type: String, 
            lowercase :true,
        },
        email:{
            type:String,
            required:[true , 'email required'],
            unique : [true , 'email must be unique'],
            minlength :[3 , 'Too short email'],
            maxlenght : [32 , 'Too long']
        },
        phone:String,
        profileImg:String,
        password:{
            type:String,
            required:[true , 'password required'],
            unique : [true , 'password must be unique'],
            minlength :[8 , 'Too short password'],
            
        },
        passwordChangeAt:Date,
        passwordResetCode:String,
        passwordResetExpiresAt:Date,
        passwordResetVerfied :Boolean,
        role:{
            type:String,
            enum:['user','admin','manager'],
            default:'user'
        },
        active:{
            type:Boolean,
            default:true,

        },
        iamge:{
            type:String,
            default:'default.png'
        },
        addreses:[{title:String,postaCode:Number, street:String}],
        wishlist:[{
            type:mongoose.Schema.ObjectId,
            ref:'Product'
        }]
    }, 
    {timestamps:true}
)

userSchema.pre('save',async function(next){
    //
    if(!this.isModified('password'))return next()
    
    this.password =await bcrypt.hash(this.password,10)
    next()

})

const user = mongoose.model('User',userSchema)
module.exports = user