const { Router } = require('express');
const { check } = require('express-validator');
const { login, loginGoogle } = require('../controllers/authController');

const { validateFields } = require('../middlewares/validator');
const { emailValidator} = require('../helpers/dbValidators');


const router = Router();

router.post('/login',[
    check('email', 'The email is not valid').isEmail(),
    validateFields,
], login);


router.post('/google',[
    check('id_token', 'The token was not provided').notEmpty(),
    validateFields,
], loginGoogle);



module.exports = router;