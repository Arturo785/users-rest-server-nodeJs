const { response, request } = require("express");

const { uploadFileHelper } = require('../helpers/uploadsHelper')

const User = require('../models/user');
const Product = require('../models/product');




const uploadFile = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
        res.status(400).json({ msg: 'No files were selected' });
    }


    try {
        const pathOfFile = await uploadFileHelper(req.files, undefined, 'images');

        res.json({
            path: pathOfFile
        });

    } catch (err) {
        res.status(400).json({
            err
        });
    }


}


const putImageToCollection = async (req = request, res = response) => {
    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({
                    msg: 'User with that id not found'
                });
            }
            break;

        case 'products':

            model = await Product.findById(id);

            if (!model) {
                return res.status(400).json({
                    msg: 'Product with that id not found'
                });
            }
            break;

        default:
            return res.status(500).json({
                msg: 'Accepted but not handled'
            });
    }


    if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
        return res.status(400).json({ msg: 'No files were selected' });
    }

    const imageFile = await uploadFileHelper(req.files, undefined, collection);
    model.image = imageFile

    await model.save()

    res.json({
        model
    });
}


module.exports = {
    uploadFile,
    putImageToCollection,
}