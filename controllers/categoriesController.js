const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Categorie = require('../models/categorie');




const getCategories = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query; // this gets the query params that are optional

    const [totalAmount, categories] = await Promise.all([
        Categorie.countDocuments({ state: true }),
        Categorie.find({ state: true }) // only the ones that are active
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    const authenticatedUser = req.user;

    res.json({
        msg: 'GET (controller)',
        "total": totalAmount,
        categories,
        authenticatedUser,
    });
}

const getCategorie = async (req, res = response) => {
    const { id } = req.params;

    const categorie = await Categorie.findById(id).populate('user', 'name');


    res.json({
        msg: 'GET id (controller)',
        categorie,
    });
}

const postCategorie = async (req, res = response) => {

    const name = req.body.name.toUpperCase();

    const categorieDB = await Categorie.findOne({ name });

    if (categorieDB) {
        return res.status(400).json({
            msg: 'Categorie already existent',
        });
    }

    const data = {
        name,
        user: req.user._id
    }

    const categorie = new Categorie(data);

    await categorie.save();

    res.status(201).json({
        msg: 'POST (controller)',
        categorie
    });
}

const putCategorie = async (req, res = response) => {
    const { id } = req.params;
    const { state, user, ...data } = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user._id;

    const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true });


    res.json({
        msg: 'PUT (controller)',
        categorie,
    });
}


const deleteCategorie = async (req, res = response) => {
    
    const { id } = req.params;

    const categorie = await Categorie.findByIdAndUpdate(id, { state: false });

    const authenticatedUser = req.user;

    res.json({
        msg: 'DELETE (controller)',
        categorie,
        authenticatedUser
    });
}


module.exports = {
    getCategories,
    getCategorie,
    postCategorie,
    putCategorie,
    deleteCategorie,
}
