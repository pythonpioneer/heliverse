// importing all requirements
const { check } = require("express-validator");
const { validateBooleanOnly } = require("../../utility/validateFields/booleanField");
const { validateEmail } = require("../../utility/validateFields/emailField");
const { validateMongoId } = require("../../utility/validateFields/mongoField");
const { validateString } = require("../../utility/validateFields/stringFields");


// genearating validation array to create a new user
exports.validateCreateUserFields = [
    ...validateString(['first_name', 'last_name', 'gender', 'domain'], false, { min: 1, max: 50 }),
    ...validateEmail(['email']),
    ...validateBooleanOnly(['available']),
];

// genearating validation array to update the user
exports.validateUpdateUserFields = [
    ...validateMongoId(['id']),
    ...validateString(['first_name', 'last_name', 'gender', 'domain'], true, { min: 1, max: 50 }),
    ...validateEmail(['email'], true),
    ...validateBooleanOnly(['available'], true),
];

// generating validation array to validate user's name
exports.validateFetchUsers = [
    ...validateString(['name'], false, { max: 50 }),
];