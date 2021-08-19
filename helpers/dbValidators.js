const Categorie = require('../models/categorie');
const Role = require('../models/role');
const User = require('../models/user');
const Product = require('../models/product');
const { collection } = require('../models/user');



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

const categorieExistsValidator = async (id) => {
    const exists = await Categorie.findById(id); // comes from mongo implementation not from our instance

    if (!exists) {
        throw new Error(`The id: does not exists`) // custom error catched in the middleware
    }
}

const productExistsValidator = async (id) => {
    const exists = await Product.findById(id); // comes from mongo implementation not from our instance

    if (!exists) {
        throw new Error(`The id: does not exists`) // custom error catched in the middleware
    }
}

const validCollections = (collection = '', collections = []) => {
    const isIncluded = collections.includes(collection);

    if (!isIncluded) {
        throw new Error(`The collection ${collection} is not valid: valid collections are ${collections}`);
    }

    return true;

}

module.exports = {
    roleValidator,
    emailValidator,
    userExistsValidator,
    categorieExistsValidator,
    productExistsValidator,
    validCollections,
}