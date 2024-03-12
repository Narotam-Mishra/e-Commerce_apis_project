const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const getAllUsers = async(req,res) => {
    console.log(req.user);
    // get all users by removing their password
    const users = await User.find({ role:'user' }).select('-password')
    res.status(StatusCodes.OK).json({ users, count:users.length });
}

const getSingleUser = async(req,res) => {
    // get single user details by discarding password
    const user = await User.findOne({ _id:req.params.id }).select('-password')
    if(!user){
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id} found`)
    }
    res.status(StatusCodes.OK).json({ user });
}

const showCurrentUser = async(req,res) => {
    res.send('show current user...')
}

const updateUser = async(req,res) => {
    res.send('user details updated...')
}

const updateUserPassword = async(req,res) => {
    res.send('user password updated...')
}

module.exports = {
    getAllUsers, getSingleUser, showCurrentUser, updateUser, updateUserPassword
}