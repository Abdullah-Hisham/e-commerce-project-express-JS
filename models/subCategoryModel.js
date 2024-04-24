const mongoose = require('mongoose')

const subCategorySchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true , 'category required'],
        unique : [true , 'category must be unique'],
        minlength :[3 , 'Too short hh'],
        maxlenght : [32 , 'Too long']
    },
    slug:{
        type: String, 
        lowercase :true,
    },
    category :{
        type: mongoose.Schema.ObjectId,
        ref : 'Category',
        required:[true , 'must be blong to parent']
    },
    
    },
    {timestamps:true},)
    
module.exports = mongoose.model('SubCatgory',subCategorySchema)