const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { createTokenUser, attachCookiesToResponse, checkPermissions } = require('../utils/index');

const getAllUsers = async(req,res) => {
    // console.log(req.user);
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
    checkPermissions(req.user, user._id);
    res.status(StatusCodes.OK).json({ user });
}

const showCurrentUser = async(req,res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

// update user using user.save()
const updateUser = async(req,res) => {
    const { email, name } = req.body;
    // extract email ans name from request body
    if(!email || !name){
        throw new CustomError.BadRequestError(`Please provide both name and email values!`);
    }

    // find user by id and update them
    const updatedUser = await User.findOne({ _id:req.user.userId });
    updatedUser.email = email;
    updatedUser.name = name;

    // save updated user's details (name and email)
    await updatedUser.save();

    // create new token token for updated user
    const tokenUser = createTokenUser(updatedUser);
    attachCookiesToResponse({ res, user:tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser});
}

const updateUserPassword = async(req,res) => {
    const { oldPassword, newPassword } = req.body;
    if(!oldPassword || !newPassword){
        throw new CustomError.BadRequestError('Please provide both values');
    }

    const user = await User.findOne({ _id:req.user.userId });

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError(`Invalid credentials`);
    }
    // update the new password
    user.password = newPassword;

    // save the new password
    await user.save();
    res.status(StatusCodes.OK).json({msg: `password updated successfully!`});
}

// update user using findOneAndUpdate() method
/*
const updateUser = async(req,res) => {
    const { email, name } = req.body;
    // extract email ans name from request body
    if(!email || !name){
        throw new CustomError.BadRequestError(`Please provide both name and email values!`);
    }

    // update the user's details name and email
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user.userId },
      { email, name },
      { new: true, runValidators: true }
    );

    // create new token token for updated user
    const tokenUser = createTokenUser(updatedUser);
    attachCookiesToResponse({ res, user:tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser});
}
*/

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};