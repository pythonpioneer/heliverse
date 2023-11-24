// importing requriements
const User = require("../models/User");


// to find all the user by searching the name of the user
const searchUser = async (req, res) => {
    try {
        // fetch data from query params
        const { name } = req.query;

        // Use a regular expression for case-insensitive partial matching
        const regex = new RegExp(name, 'i');

        // Search for users with names containing the provided characters
        const users = await User.find({ $or: [{ first_name: { $regex: regex } }, { last_name: { $regex: regex } }] });
        
        // users found by name
        return res.status(200).json({ status: 200, message: 'Users found!!', totalResults: users.length, users: users });
    
    } catch (err) {  // unrecogonized errors
        return res.status(500).json({ status: 500, message: "Internal Server Error!" });
    }
};

// export all the controller functions
module.exports = { searchUser };