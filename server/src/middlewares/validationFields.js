// importing all requirements

const { validateString } = require("../utility/validateFields/stringFields");


// genearating validation array to create a new user
exports.validateCreateUserFields = [
    ...validateString(['first_name', 'last_name', 'gender', 'domain'], false, { min: 1, max: 50 }),
];
