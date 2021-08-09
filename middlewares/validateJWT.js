const { response, request } = require('express')
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJTW = async (req = request, res = response, next) => {
    const token = req.header('x-token'); // reads it from the request

    if (!token) {
        return res.status(401).json({
            msg: "No token provided"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY_JTW);

        const user = await User.findById(uid);

        if(!user) {
            return res.status(401).json({
                msg: "Invalid User (does not exist)"
            }); 
        }

        //check if user is not deleted

        if(!user.state){
            return res.status(401).json({
                msg: "Invalid User (deleted)"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            msg: "Token invalid in catch"
        });
    }
}


module.exports = {
    validateJTW,
}