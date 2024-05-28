const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
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
    image: String, 
    

},{timestamps:true});

const setImageURL = (doc) => {
    if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/categories/${doc.image}`;
    doc.image = imageUrl;
    }
};

categorySchema.post('init', (doc) => {
    setImageURL(doc);
});


categorySchema.post('save', (doc) => {
    setImageURL(doc);
});

const Category = mongoose.model('categories',categorySchema)


module.exports = Category