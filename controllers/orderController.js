

const createOrder = (req,res) => {
    res.send('order created...');
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