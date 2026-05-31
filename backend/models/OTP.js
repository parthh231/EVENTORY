const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    otp : {
        type : String,
        required : true
    },
    action : {
        type : String,
        enum : ['account_verification', 'event_booking'],
        required : true
    },
    createdAt : {
        type : Date,
        dafault : Date.now,
        expires : 300 // expires in 5 minites
    }
});

module.exports = mongoose.model('OTP', otpSchema);