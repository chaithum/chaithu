const mongoose = require("mongoose")
 
const Schema = mongoose.Schema;
 
const itemSchema = new Schema({
    foodname: {
        type: String,
        required: true,
        unique:true
    },
 
    category : {
        type: String,
        required: true,
   
    },
 
    description : {
        type: String,
        required: true,
         minlength: 6
    },
 
    availability: {
        type: String,
         default: true
    },
 
    price : {
        type: Number,
        required: true
    },
 
    imageURL: {
        type: String,
        required: false
    },
    // Rating:{
    //     type:Number,
    //     required:true,
    //    minlength:0,
    // maxlength:5
    // },
    // Restaurant: [{ type: mongoose.Types.ObjectId, ref: "", required: true}],
})
 
module.exports = mongoose.model("Food", itemSchema)
 
 
 
 
 