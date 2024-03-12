
const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const jwt = require('jsonwebtoken');
const { attachCookiesToResponse, createTokenUser } = require('../utils/index');

const register = async (req,res) => {
    const { email, name, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if(emailAlreadyExists){
        throw new CustomError.BadRequestError('Email already exists');
    }

    // register first user as an 'admin'
    const isFirstAccount = await User.countDocuments() === 0;
    const role = isFirstAccount ? 'admin' : 'user'

    const user = await User.create({ name, email, password, role });
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user:tokenUser });
    res.status(StatusCodes.CREATED).json({ user:tokenUser })
}

// login function
const login = async (req,res) => {
    const { email, password} = req.body;

    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email });
    if(!user){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user:tokenUser });
    res.status(StatusCodes.ACCEPTED).json({ user:tokenUser });
}

const logout = async (req,res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ message: 'user loggout out successfully!!'});
}

module.exports = {
    register, login, logout
}