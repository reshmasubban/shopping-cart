const mongoose = require('mongoose');
const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type:Number,
        required: true,
        default:3,
    }
});

module.exports = mongoose.model('User',userSchema);
