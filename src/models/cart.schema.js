const mongoose = require('mongoose');

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
   
   Usuario:{
    type:String,
    required:true
   },
    Cart:{
        type:[],
        default:[]
       }
    
})

module.exports = mongoose.model(cartCollection,cartSchema);