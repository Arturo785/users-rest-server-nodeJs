const { response, request } = require("express");
const path = require('path');
const fs = require('fs');

const { uploadFileHelper } = require('../helpers/uploadsHelper')

const User = require('../models/user');
const cloudinary = require('cloudinary').v2;
const Product = require('../models/product');
const { dirname } = require("path");



cloudinary.config(process.env.CLOUDINARY_URL);



const uploadFile = async (req = request, res = response) => {

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


    // clean prev images

    try {
        if (model.image) {
            const pathImage = path.join(__dirname, '../uploads', collection, model.image);

            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }
    } catch (err) {
        console.log(err);
    }

    const imageFile = await uploadFileHelper(req.files, undefined, collection);
    model.image = imageFile

    await model.save()

    res.json({
        model
    });
}


const putImageToCollectionCloudinary = async (req = request, res = response) => {
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


    // clean prev images
    try {
        if (model.image) {
            const pathImage = model.image.split('/');
            const name = pathImage[pathImage.length - 1];
            const [public_id] = name.split('.')

            cloudinary.uploader.destroy(public_id);
        }
    } catch (err) {
        console.log(err);
    }



    const { tempFilePath } = req.files.myFile
    const response = await cloudinary.uploader.upload(tempFilePath)
    model.image = response.secure_url;


    await model.save()

    res.json({
        model
    });
}


const getImageFromCollection = async (req = request, res = response) => {
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


    try {
        if (model.image) {
            const pathImage = path.join(__dirname, '../uploads', collection, model.image);

            if (fs.existsSync(pathImage)) {
                return res.sendFile(pathImage)
            }
        }
    } catch (err) {
        console.log(err);
    }

    const pathImageNotFound = path.join(__dirname, '../assets', 'no-image.jpg');

    res.sendFile(pathImageNotFound)
}


module.exports = {
    uploadFile,
    putImageToCollection,
    getImageFromCollection,
    putImageToCollectionCloudinary,
}