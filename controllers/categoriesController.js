const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Categorie = require('../models/categorie');




const getCategories = (req, res = response) => {
    res.json({
        msg: 'GET (controller)',
    });
}

const getCategorie = (req, res = response) => {
    res.json({
        msg: 'GET id (controller)',
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

const putCategorie = (req, res = response) => {
    res.json({
        msg: 'PUT (controller)',
    });
}

const deleteCategorie = (req, res = response) => {
    res.json({
        msg: 'DELETE (controller)',
    });
}


module.exports = {
    getCategories,
    getCategorie,
    postCategorie,
    putCategorie,
    deleteCategorie,
}
