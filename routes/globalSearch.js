const { Router } = require('express');
const { doGlobalSearch } = require('../controllers/globalSearchController');


const router = Router();


router.get('/:collection/:term', doGlobalSearch);



module.exports = router;