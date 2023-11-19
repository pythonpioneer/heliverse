// importing requirements
const mongoose = require('mongoose');


// creating schema for users
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: [1, 'Name must be atleast 1 characters long'],
        max: [50, 'The name can not be longer than 50 characters.']
    },
    lastName: {
        type: String,
        required: true,
        min: [1, 'Name must be atleast 1 characters long'],
        max: [50, 'The name can not be longer than 50 characters.']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    gender: {
        type: String,
        required: true,
        min: [1, 'Name must be atleast 1 characters long'],
        max: [50, 'The name can not be longer than 50 characters.']
    },
    domain: {
        type: String,
        required: true,
        min: [1, 'Name must be atleast 1 characters long'],
        max: [50, 'The name can not be longer than 50 characters.']
    },
    available: {
        type: Boolean,
        required: true,
        default: true,
    },
    avatar: {
        type: String,  // store the URL of the image
        required: true,
    }
});

// now export the user model
const User = mongoose.model('User', userSchema)
module.exports = User;