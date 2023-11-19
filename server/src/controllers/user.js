// importing requirements
const { hostDomain, port } = require('../constants');
const fs = require('fs');
const User = require('../models/User');


// to create an user
const createUser = async (req, res) => {
    try {
        // validating the image fields
        if (!req.file) return res.status(400).json({ status: 400, message: "You haven't uploaded the image" });

        // fetching all the details from request body
        const { first_name, last_name, email, gender, domain, available } = req.body;
        const avatar = `${hostDomain}${port}/avatar/${req.file.filename}`;  // url of the avatar image

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

// to update the user fields
const updateUser = async (req, res) => {
    try {
        // fetch all other info from the request body and query
        const { first_name, last_name, email, gender, domain, available } = req.body;
        const userId = req?.params?.id;

        // if there is no user id 
        if (!userId) return res.status(400).json({ status: 400, message: "You haven't sent the id of the user!" });

        // find the user data
        let user = await User.findById(userId);
        if (!user) return res.status(404).json({ status: 404, message: "User not found!!" });

        // update the user
        let toBeUpdated = false;
        let updatedUser = {};

        // find the fields to be updated
        if (first_name) {
            toBeUpdated = true;
            updatedUser.firstName = first_name;
        }
        if (last_name) {
            toBeUpdated = true;
            updatedUser.lastName = last_name;
        }
        if (email) {
            toBeUpdated = true;

            // check that the email is unique
            if ((await User.find({ email })).length != 0) return res.status(400).json({ status: 400, message: "Email Already exists!!" });

            // else update the email
            updatedUser.email = email;
        }
        if (domain) {
            toBeUpdated = true;
            updatedUser.domain = domain;
        }
        if (gender) {
            toBeUpdated = true;
            updatedUser.gender = gender;
        }
        if (available) {
            toBeUpdated = true;
            updatedUser.available = available;
        }
        if (req.file) {  // user uploded the image
            toBeUpdated = true;
            console.log(user.avatar.split('avatar_'))
            const imgPath = 'public/uploads/' + 'avatar_' + user.avatar.split('avatar_').at(-1);  // slicing the avatar url to fetch the path of the image

            // now, delete the old image
            if (fs.existsSync(imgPath)) {  // Check if the file exists
                // Delete the file
                fs.unlinkSync(imgPath);
            }

            const avatar = `${hostDomain}${port}/avatar/${req.file.filename}`;  // url of the avatar image
            updatedUser.avatar = avatar;  // update the avatar url
        }

        // update all the fields to be updated
        if (toBeUpdated) {
            // now update the user and send the response
            user = await User.findByIdAndUpdate(userId, { $set: updatedUser }, { new: true });
            return res.status(200).json({ status: 200, message: 'user updated' });
        }
        // this will not send any json as response because status: 204
        else return res.status(204).json({ status: 204, message: "Nothing is there to be updated" });

    } catch (err) {  // unrecogonized errors
        return res.status(500).json({ status: 500, message: "Internal Server Error!" });
    }
};


// export all the controllers method
module.exports = { createUser, updateUser };