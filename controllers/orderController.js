
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors');
const { checkPermissions, getRandomText } = require('../utils/index');

const fakeStripeAPI = async (amount, currency) => {
    const client_secret = getRandomText();
    return {client_secret, amount};
}

const createOrder = async (req,res) => {
    const { items:cartItems, tax, shippingFee } = req.body;

    // check if there is any item in the cart
    if(!cartItems || cartItems.length < 1){
        throw new CustomError.BadRequestError('No cart items provided');
    }

    // check for tax and shipping fee
    if(!shippingFee || !tax){
        throw new CustomError.BadRequestError('Please provide tax and shipping fee'); 
    }

    let orderItems = [];
    let subtotal = 0;

    for(const item of cartItems){
        const dbProduct = await Product.findOne({ _id:item.product })
        
        if(!dbProduct){
            throw new CustomError.NotFoundError(`No product with id: ${item.product}`);
        }
        const { name, price, image, _id } = dbProduct
        // console.log('Order Item details:', name, price, image);

        const singleOrderItem = {
          amount: item.amount,
          name,
          price,
          image,
          product: _id,
        };

        // add item to order array (cart items)
        orderItems = [...orderItems, singleOrderItem]

        // calculate subtotal
        subtotal += item.amount * price
    }

    // console.log("cart Items:",orderItems);
    // console.log('Subtotal:', subtotal);

    // calculate total
    const total = tax + shippingFee + subtotal
    
    // get client secret (using fakeStripeAPI() method)
    const paymentIntent = await fakeStripeAPI({
        amount: total,
        currency: 'usd'
    })

    const order = await Order.create({
      orderItems,
      total,
      subtotal,
      tax,
      shippingFee,
      clientSecret: paymentIntent.client_secret,
      user: req.user.userId,
    });
    res.status(StatusCodes.CREATED).json({ order, clientSecret:order.clientSecret});
}

const getAllOrders = (req,res) => {
    res.send('get all orders...');
}

const getSingleOrder = (req,res) => {
    res.send('get single order...');
}

const getCurrentUserOrders = (req,res) => {
    res.send('get current user orders...');
}

const updateOrder = (req,res) => {
    res.send('order updated...');
}


module.exports = {
    getAllOrders,
    getSingleOrder,
    getCurrentUserOrders,
    createOrder,
    updateOrder,
}