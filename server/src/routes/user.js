// importing requirements
const { createUser, updateUser, fetchSingleUser, fetchAllUsers, deleteUser } = require('../controllers/user');
const { uploadImage } = require('../middlewares/handleFile/uploadFiles');
const { validateValidationResult } = require('../middlewares/validation/validateValidationResults');
const { validateCreateUserFields, validateUpdateUserFields, validateFetchUsers } = require('../middlewares/validation/validationFields');
const { validateMongoId } = require('../utility/validateFields/mongoField');
const router = require('express').Router();


// Route 1: To create a new user: '/api/v1/users/' [using POST] (login not required)
router.post('/', uploadImage('avatar'), validateCreateUserFields, validateValidationResult, createUser);

// Route 2: To update an existing user: '/api/v1/users/id' [using PUT] (login not required)
router.put('/:id', uploadImage('avatar'), validateUpdateUserFields, validateValidationResult, updateUser);

// Route 3: To fetch details of existing user: '/api/v1/users/id' [using GET] (login not required)
router.get('/:id', fetchSingleUser);

// Route 4: To delete the existing users: '/api/v1/users/id' [using DELETE] (login not required)
router.delete('/:id', validateMongoId(['id']), validateValidationResult, deleteUser);

// Route 5: To get all the users list: (use pagenation) '/api/v1/users/?page=<number>&name=<string>&gender=<string>&domain=<string>&available=<boolean-string>' [using GET] (login not required)
router.get('/', fetchAllUsers);


// export the router
module.exports = router;