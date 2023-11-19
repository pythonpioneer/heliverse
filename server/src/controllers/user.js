// importing requirements
const { domain, port } = require('../constants');
const User = require('../models/User');


// to create an user
const createUser = async (req, res) => {
    try {
        // validating the image fields
        if (!req.file) return res.status(400).json({ status: 400, message: "You haven't uploaded the image" });

        // fetching all the details from request body
        const { first_name, last_name, email, gender, domail, available } = req.body;
        const avatar = `${domain}${port}/avatar/${req.file.filename}`;  // url of the avatar image

        // confirm that the user email is unique
        if ((await User.find({ email })).length != 0) return res.status(400).json({ status: 400, message: "Email Already exists!!" });

        // now, create the user
        User.create({
            firstName: first_name,
            lastName: last_name,
            email: email,
            gender: gender,
            domain: domain,
            available: available,
            avatar: avatar,
        })
            .then(user => {  // user created successfully
                return res.status(201).json({ status: 201, message: "User Created!!" });
            })
            .catch(err => {  // error while creating user
                return res.status(400).json({ status: 400, message: "User does not created, Failed!!" });
            });
        
    } catch (err) {  // unrecogonized errors
        return res.status(500).json({ status: 500, message: "Internal Server Error!" });
    }
};


// export all the controllers method
module.exports = { createUser };