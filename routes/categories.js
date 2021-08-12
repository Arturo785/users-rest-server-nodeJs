

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validator');
const { validateJTW } = require('../middlewares/validateJWT');
const { putCategorie, deleteCategorie, postCategorie, getCategorie, getCategories } = require('../controllers/categoriesController');



const router = Router();

//router lets us define our endpoints

router.get('/', getCategories);  // this way we pass the reference and all params to the func


router.get('/:id', getCategorie);  // this way we pass the reference and all params to the func


router.post('/', [
    validateJTW,
    check('name', 'The name is mandatory').notEmpty(),
    validateFields,
], postCategorie);  // this way we pass the reference and all params to the func

router.put('/:id', [
    validateJTW,
    check('name', 'The name is mandatory').not().isEmpty(),
    validateFields, // this way we pass the reference and all params to the func
], putCategorie);  // this way we pass the reference and all params to the func

router.delete('/:id', [
    validateJTW,
    validateFields, // this way we pass the reference and all params to the func
], deleteCategorie);  // this way we pass the reference and all params to the func





module.exports = router;