
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
    const reviews = await Review.find({});

    res.status(StatusCodes.OK).json({ reviews, count: reviews.length});
}

const getSingleReview = async(req,res) => {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });
    
    if(!review){
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
    }
    res.status(StatusCodes.OK).json({ review });
}

const updateReview = async(req,res) => {
    const { id: reviewId } = req.params;

    const { rating, title, comment } = req.body; 
    
    const review = await Review.findOne({ _id: reviewId });
    
    if(!review || !(review instanceof Review)){
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
    }

    // check permisions
    // also check whether user id matches to that of review's user id 
    checkPermissions(req.user, review.user);
    
    // update review properties one by one
    review.rating = rating;
    review.title = title;
    review.comment = comment;

    await review.save();
    res.status(StatusCodes.ACCEPTED).json({ review });
}

const deleteReview = async(req,res) => {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });
    
    if(!review || !(review instanceof Review)){
        throw new CustomError.NotFoundError(`No review with id ${reviewId}`);
    }

    // check permisions
    // also check whether user id matches to that of review's user id 
    checkPermissions(req.user, review.user);
    
    await review.deleteOne();
    res.status(StatusCodes.OK).json({ msg: `Review removed successfully!!`});
}

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};