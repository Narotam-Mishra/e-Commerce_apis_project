
const createProduct = async(req, res) => {
    res.send('product created...');
}

const getAllProducts = async(req, res) => {
    res.send('get all products...');
}

const getSingleProduct = async(req, res) => {
    res.send('get single product...');
}

const updateProduct = async(req, res) => {
    res.send('update product...');
}

const deleteProduct = async(req, res) => {
    res.send('delete product...');
}

const uploadImage = async(req, res) => {
    res.send('upload product image...');
}

module.exports = {
    createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, uploadImage
}