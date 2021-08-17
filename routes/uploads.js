

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validator');
const { validateJTW } = require('../middlewares/validateJWT');
const { uploadFile, putImageToCollection, getImageFromCollection, putImageToCollectionCloudinary } = require('../controllers/uploadsController');
const { validCollections } = require('../helpers/dbValidators');
const { validateFileUpload } = require('../middlewares/validateFile');

const router = Router();

//router lets us define our endpoints

router.post('/', validateFileUpload, uploadFile);


router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'The id must be a Mongo ID').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validateFields
], //putImageToCollection);
    putImageToCollectionCloudinary);


router.get('/:collection/:id', [
    check('id', 'The id must be a Mongo ID').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validateFields
], getImageFromCollection);

module.exports = router;