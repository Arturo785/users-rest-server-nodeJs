const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/authController');

const { validateFields } = require('../middlewares/validator');
const { emailValidator} = require('../helpers/dbValidators');


const router = Router();

router.post('/login',[
    check('email', 'The email is not valid').isEmail(),
    validateFields,
], login); // this way we pass the reference and all params to the func


router.post('/google',[
    check('id_token', 'The token was not provided').notEmpty(),
    validateFields,
], loginGoogle); // this way we pass the reference and all params to the func



module.exports = router;