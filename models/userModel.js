
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { func } = require('joi');
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 75,
    },
    email:{
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate:{
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        maxlength: 99,
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
});

// hash and compare password

UserSchema.pre('save', async function(){
    // console.log('updated data:', this.modifiedPaths());
    // console.log(this.isModified('name'));

    // prevent unecessay update to password due to updated in name and email
    if(!this.isModified('password')) return;
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}



module.exports = mongoose.model('User', UserSchema);