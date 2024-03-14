
const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { checkPermissions } = require('../utils/index');


// review APIs

const createReview = async(req,res) => {
    const { product: productId } = req.body;
    
    const isValidProduct = await Product.findOne({ _id: productId });

    // before giving review check whether the product exist or not
    if(!isValidProduct){
        throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }

    // check if user already given review to the product
    const alreadySubmitted = await Review.findOne({
        product: productId,
        user: req.user.userId
    });

    if(alreadySubmitted){
        throw new CustomError.BadRequestError(`Already submitted review for this product`);
    }

    // attach user property (set it to equal to req.user.userId) onto req.body
    req.body.user = req.user.userId;

    // create review
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({ review });
}

const getAllReviews = async(req,res) => {
    res.send('get all reviews...')
}

const getSingleReview = async(req,res) => {
    res.send('get single review...')
}

const updateReview = async(req,res) => {
    res.send('review updated...')
}

const deleteReview = async(req,res) => {
    res.send('review deleted...')
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};