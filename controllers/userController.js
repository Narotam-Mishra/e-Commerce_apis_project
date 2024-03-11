
const getAllUsers = async(req,res) => {
    res.send('get all users...')
}

const getSingleUser = async(req,res) => {
    res.send('get single user...')
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