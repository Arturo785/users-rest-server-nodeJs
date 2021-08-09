

const { Router } = require('express');
const { getUser, postUser, putUser, deleteUser } = require('../controllers/userController');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validator');
const { roleValidator, emailValidator, userExistsValidator } = require('../helpers/dbValidators');
const { validateJTW } = require('../middlewares/validateJWT');
const { validateRole } = require('../middlewares/validateRoles');


const router = Router();

//router lets us define our endpoints


router.get('/', [
    validateJTW,
], getUser);

// in order to catch routes of the path
// second param can be middlewares to validate data
router.post('/', [
    check('name', 'The name is required').not().isEmpty(), // adds the errors encountered to be chequed in this case the controller
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(emailValidator),
    check('password', 'The password is mandatory and 6 or more characters').isLength({ min: 6 }),
    //   check('role', 'Not a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(roleValidator), // this way we pass the reference of the role to the funcion and nodeJS invoques it passing the param automatically
    validateFields
], postUser);

router.put('/:id', [
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(userExistsValidator),
    check('role').custom(roleValidator),
    validateFields,
], putUser);

router.delete('/:id', [
    validateJTW,
    validateRole('ADMIN_ROLE'),
    check('id', 'Not a valid id').isMongoId(),
    check('id').custom(userExistsValidator),
    validateFields,
], deleteUser);



module.exports = router;