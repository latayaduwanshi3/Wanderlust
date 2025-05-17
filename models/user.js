const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

//passportLocalMongoose automatically defines password and username
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
