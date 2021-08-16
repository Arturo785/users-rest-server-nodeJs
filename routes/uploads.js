

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validator');
const { validateJTW } = require('../middlewares/validateJWT');
const { uploadFile, putImageToCollection } = require('../controllers/uploadsController');
const {validCollections} = require('../helpers/dbValidators')

const router = Router();

//router lets us define our endpoints

router.post('/', uploadFile);


router.put('/:collection/:id', [
    check('id', 'The id must be a Mongo ID').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    validateFields
], putImageToCollection);

module.exports = router;