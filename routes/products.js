

const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validator');
const { validateJTW } = require('../middlewares/validateJWT');
const { getProduct, getProducts, postProduct, putProduct, deleteProduct } = require('../controllers/productsController');



const router = Router();

//router lets us define our endpoints

router.get('/', getProducts);  // this way we pass the reference and all params to the func

router.get('/:id', getProduct);

router.post('/', postProduct);

router.put('/:id', putProduct);

router.delete('/:id', deleteProduct);