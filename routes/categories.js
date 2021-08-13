

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validator');
const { validateJTW } = require('../middlewares/validateJWT');
const { putCategorie, deleteCategorie, postCategorie, getCategorie, getCategories } = require('../controllers/categoriesController');
const { categorieExistsValidator } = require('../helpers/dbValidators');



const router = Router();

//router lets us define our endpoints

router.get('/', getCategories);  // this way we pass the reference and all params to the func


router.get('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categorieExistsValidator),
    validateFields,
], getCategorie);  // this way we pass the reference and all params to the func


router.post('/', [
    validateJTW,
    check('name', 'The name is mandatory').notEmpty(),
    validateFields,
], postCategorie);  // this way we pass the reference and all params to the func

router.put('/:id', [
    validateJTW,
    check('name', 'The name is mandatory').not().isEmpty(),
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categorieExistsValidator),
    validateFields, // this way we pass the reference and all params to the func
], putCategorie);  // this way we pass the reference and all params to the func

router.delete('/:id', [
    validateJTW,
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(categorieExistsValidator),
    validateFields, // this way we pass the reference and all params to the func
], deleteCategorie);  // this way we pass the reference and all params to the func





module.exports = router;