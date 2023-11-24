// importing requirements
const { searchUser } = require('../controllers/filterUser');
const { validateValidationResult } = require('../middlewares/validation/validateValidationResults');
const { validateName } = require('../middlewares/validation/validationFields');
const router = require('express').Router();


// Route 1: To fetch all users by search:  '/api/v1/filter/search?name=<name>' [using GET] (login not required)
router.get('/search', validateName, validateValidationResult, searchUser);

// export the router
module.exports = router;