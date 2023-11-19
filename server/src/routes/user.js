// importing requirements
const { createUser } = require('../controllers/user');
const { validateValidationResult } = require('../middlewares/validation/validateValidationResults');
const { validateCreateUserFields } = require('../middlewares/validation/validationFields');
const router = require('express').Router();
const multer = require('multer');


// saving the image in disk storage
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});


let upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 15,
    }
});


// Route 1: To create a new user: '/api/v1/users/' [using POST] (login not required)
router.post('/', upload.single('avatar'), createUser);

// Route 2: To update an existing user: '/api/v1/users/id' [using PUT] (login not required)
router.put('/:id', (req, res) => {
    res.send("update user")
});

// Route 3: To fetch details of existing user: '/api/v1/users/id' [using GET] (login not required)
router.get('/:id', (req, res) => {
    res.send("get the user")
});

// Route 4: To delete the existing users: '/api/v1/users/id' [using DELETE] (login not required)
router.delete('/:id', (req, res) => {
    res.send("delete the user")
});

// Route 5: To get all the users list: (use pagenation) '/api/v1/users/?page=<number>' [using GET] (login not required)
router.get('/', (req, res) => {
    res.send("get all users");
});

// export the router
module.exports = router;