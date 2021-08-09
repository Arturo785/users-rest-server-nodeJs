const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/authController');

const { validateFields } = require('../middlewares/validator');
const { emailValidator} = require('../helpers/dbValidators');


const router = Router();

router.post('/login',[
    check('email', 'The email is not valid').isEmail(),
    validateFields,
], login);



module.exports = router;