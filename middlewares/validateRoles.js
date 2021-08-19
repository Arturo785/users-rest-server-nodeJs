const { response, request } = require('express')

const validateRole = (...roles) => {
    // this way we can receive args and then execute the middleware functionality

    return(req = request, res = response, next) => {

        if(!req.user) {
            return res.status(500).json({
                msg : "Role without token"
            });
        }
    
        const {role, name} = req.user;
    
        if(!roles.includes(role)){
            return res.status(401).json({
                msg : `Unathorized ${name} is not ${roles}`
            });
        }
    
        next();
    }
}

module.exports = {
    validateRole
}