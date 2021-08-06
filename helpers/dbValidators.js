const Role = require('../models/role');
const User = require('../models/user');



const roleValidator = async (role = '') => {
    const exists = await Role.findOne({ role });
    if (!exists) {
        throw new Error(`The role: ${role} is not valid`) // custom error catched in the middleware
    }
}

const emailValidator = async (email = '') => {
    const emailExists = await User.findOne({ email }); // comes from mongo implementation not from our instance

    if (emailExists) {
        throw new Error(`The email: ${email} already exists`) // custom error catched in the middleware
    }
}

const userExistsValidator = async (id) => {
    const userExists = await User.findById(id); // comes from mongo implementation not from our instance

    if (!userExists) {
        throw new Error(`The id: does not exists`) // custom error catched in the middleware
    }
}

module.exports = {
    roleValidator,
    emailValidator,
    userExistsValidator,
}