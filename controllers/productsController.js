const { response } = require('express');
const Product = require('../models/Product');




const getProducts = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query; // this gets the query params that are optional

    const [totalAmount, products] = await Promise.all([
        Product.countDocuments({ state: true }),
        Product.find({ state: true }) // only the ones that are active
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    const authenticatedUser = req.user;

    res.json({
        msg: 'GET (controller)',
        "total": totalAmount,
        products,
        authenticatedUser,
    });
}

const getProduct = async (req, res = response) => {
    const { id } = req.params;

    const product = await Product.findById(id).populate('user', 'name');


    res.json({
        msg: 'GET id (controller)',
        product,
    });
}

const postProduct = async (req, res = response) => {

    const name = req.body.name.toUpperCase();
    const {price, description, categorie} = req.body;

    const productDB = await Product.findOne({ name });

    if (productDB) {
        return res.status(400).json({
            msg: 'Product already existent',
        });
    }

    const data = {
        name,
        user: req.user._id,
        price,
        description,
        categorie
    }

    const productToSave = new Product(data);

    await productToSave.save();

    res.status(201).json({
        msg: 'POST (controller)',
        productToSave
    });
}

const putProduct = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id; // updates who made the change

    const productToUpdate = await Product.findByIdAndUpdate(id, data, { new: true });


    res.json({
        msg: 'PUT (controller)',
        productToUpdate,
    });
}


const deleteProduct = async (req, res = response) => {
    
    const { id } = req.params;

    const productToDelete = await Product.findByIdAndUpdate(id, { state: false });

    const authenticatedUser = req.user;

    res.json({
        msg: 'DELETE (controller)',
        productToDelete,
        authenticatedUser
    });
}


module.exports = {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
}