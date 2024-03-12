
// user authentication middleware

const CustomError = require('../errors')
const { isTokenValid } = require('../utils/index')

const authenticateUser = async (req, res, next) => {
    const token = req.signedCookies.token;
    // console.log(token);

    if(!token){
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }

    try {
        const { name, userId, role} = isTokenValid({token});
        // console.log("Payload data:",payload);
        req.user = { name, userId, role };
        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
}

module.exports = {
    authenticateUser
}