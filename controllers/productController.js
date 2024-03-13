
const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

// product APIs

const createProduct = async(req, res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async(req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products, count: products.length});
}

const getSingleProduct = async(req, res) => {
    const { id:productId } = req.params;

    const product = await Product.findOne({ _id:productId })
    
    if(!product){
        throw new CustomError.NotFoundError(`No product available with id ${productId}`)
    }
    res.status(StatusCodes.OK).json({ product });
}

const updateProduct = async(req, res) => {
    const { id:productId } = req.params
    
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true, runValidators: true }
    );

    if(!product){
        throw new CustomError.NotFoundError(`No product available with id ${productId}`)
    }
    res.status(StatusCodes.ACCEPTED).json({ product });
}

const deleteProduct = async(req, res) => {
    const { id:productId } = req.params;

    const product = await Product.findByIdAndDelete(productId);
    if(!product){
        throw new CustomError.NotFoundError(`No product available with id ${productId}`)
    }

    // await product.remove();
    res.status(StatusCodes.OK).json({ msg: `Product deleted successfully!!`});
}

const uploadImage = async(req, res) => {
    res.send('upload product image...');
}

module.exports = {
    createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage
}