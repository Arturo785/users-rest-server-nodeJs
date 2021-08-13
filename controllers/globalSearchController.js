const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');
const Categorie = require('../models/categorie');
const Product = require('../models/product');
const Role = require('../models/role');


const validCollections = [
    'users',
    'categories',
    'products',
    'roles',
]


const searchUser = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : [] // returns if has user otherwise empty array
        });
    }

    const regex = new RegExp(term, 'i');

    const users = await User.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    });

    res.json({
        results: users
    });

}

const searchCategories = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const categorie = await Categorie.findById(term);
        return res.json({
            results: (categorie) ? [categorie] : [] // returns if has user otherwise empty array
        });
    }

    const regex = new RegExp(term, 'i');

    const categories = await Categorie.find({ name: regex, state: true });

    res.json({
        results: categories
    });

}


const searchProducts = async (term = '', res = response) => {

    const isMongoId = ObjectId.isValid(term);

    if (isMongoId) {
        const product = await Product.findById(term).populate('categorie', 'name');
        return res.json({
            results: (product) ? [product] : [] // returns if has user otherwise empty array
        });
    }

    const regex = new RegExp(term, 'i');

    const products = await Product.find({ name: regex, state: true }).populate('categorie', 'name');

    res.json({
        results: products
    });

}


const doGlobalSearch = (req, res = response) => {

    const { collection, term } = req.params;

    if (!validCollections.includes(collection)) {
        return res.status(400).json({
            msg: `invalid collection: valid collections are: ${validCollections}`,
            collection,
        })
    }

    switch (collection) {
        case 'users':
            searchUser(term, res);
            break;

        case 'categories':
            searchCategories(term, res);
            break;

        case 'products':
            searchProducts(term, res);
            break;

        case 'roles':
            break;

        default:
            res.status(500).json({
                msg: `coolection valid but not proccesed`,
            })
            break;

    }
}


module.exports = {
    doGlobalSearch,
}