

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validator');
const { validateJTW } = require('../middlewares/validateJWT');
const { getProduct, getProducts, postProduct, putProduct, deleteProduct } = require('../controllers/productsController');
const { productExistsValidator } = require('../helpers/dbValidators');



const router = Router();

//router lets us define our endpoints


router.get('/', getProducts);  // this way we pass the reference and all params to the func


router.get('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(productExistsValidator),
    validateFields,
], getProduct);  // this way we pass the reference and all params to the func


router.post('/', [
    validateJTW,
    check('name', 'The name is mandatory').notEmpty(),
    check('price', 'The price is mandatory').notEmpty(),
    check('description', 'The description is mandatory').notEmpty(),
    check('categorie', 'The description is mandatory').isMongoId(),
    validateFields,
], postProduct);  // this way we pass the reference and all params to the func

router.put('/:id', [
    validateJTW,
    check('name', 'The name is mandatory').not().isEmpty(),
    check('price', 'The price is mandatory').notEmpty(),
    check('description', 'The description is mandatory').notEmpty(),
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(productExistsValidator),
    validateFields, // this way we pass the reference and all params to the func
], putProduct);  // this way we pass the reference and all params to the func

router.delete('/:id', [
    validateJTW,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(productExistsValidator),
    validateFields, // this way we pass the reference and all params to the func
], deleteProduct);  // this way we pass the reference and all params to the func


module.exports = router;