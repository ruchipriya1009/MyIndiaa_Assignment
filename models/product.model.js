const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    'product':{
        type:String,
        required:true
    },
    'productCategory':{
        type:String,
    },
    'productDescription':{
        type:String,
    },
    'productQuantity':{
        type:Number,
    },
    'productPrize':{
        type:Number
    },
    'productSupplier':{
        type:String
    }
});

module.exports = {productSchema}