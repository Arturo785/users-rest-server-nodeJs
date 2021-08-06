
const { validationResult } = require('express-validator');


const validateFields = (req, res, next) => {
    const errors = validationResult(req); // comes from the errors in the middlewares of the routes

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validateFields,
}