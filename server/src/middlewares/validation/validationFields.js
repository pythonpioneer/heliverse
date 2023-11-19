// importing all requirements
const { check } = require("express-validator");
const { validateBooleanOnly } = require("../../utility/validateFields/booleanField");
const { validateEmail } = require("../../utility/validateFields/emailField");
const { validateString } = require("../../utility/validateFields/stringFields");


// genearating validation array to create a new user
exports.validateCreateUserFields = [
    ...validateString(['first_name', 'last_name', 'gender', 'domain'], false, { min: 1, max: 50 }),
    ...validateEmail(['email']),
    ...validateBooleanOnly(['available']),
];
