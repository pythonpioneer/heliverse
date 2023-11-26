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
            first_name: first_name,
            last_name: last_name,
            email: email,
            gender: gender,
            domain: domain,
            available: available,
            avatar: avatar,
        })
            .then(user => {  // user created successfully
                return res.status(201).json({ status: 201, message: "User Created!!", user: user });
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
            updatedUser.first_name = first_name;
        }
        if (last_name) {
            toBeUpdated = true;
            updatedUser.last_name = last_name;
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

// to fetch the user details by id
const fetchSingleUser = async (req, res) => {
    try {
        // fetch the id from query param
        const userId = req.params.id;

        // check that the user exists or not
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ status: 404, message: "User not found!!" });

        // send the user as response
        return res.status(200).json({ status: 200, message: "User Found!", user: user });

    } catch (err) {  // unrecogonized errors
        return res.status(500).json({ status: 500, message: "Internal Server Error!" });
    }
};

// to fetch all the user, send per page 20 data
const fetchAllUsers = async (req, res) => {
    try {
        // fetch the page number
        let page = Number(req.query['page']) || 1;
        let limit = 20;
        let skip = (page - 1) * limit;

        // fetch the user's name from query param
        const { name, gender, available, domain } = req.query;

        // Use a regular expression for case-insensitive partial matching
        const regex = new RegExp(name, 'i');

        // fetch all the user data
        const users = await User.find();
        if (users.length === 0) return res.status(200).json({ status: 200, message: "No Users to display!" });

        // to implement search and filter
        let searchQuery = {}; 
        let filterQuery = {};

        // now serach for the users
        if (name) searchQuery = {
            $or: [
                { first_name: { $regex: regex } },
                { last_name: { $regex: regex } },
            ],
        };

        // now, filter the data
        if (gender) filterQuery.gender = gender;
        if (domain) filterQuery.domain = domain;
        if (available.length !== 0) {  // there is something in available

            // now, validate that available containse boolean values
            if (available === 'false' || available === 'true') filterQuery.available = available;
            else return res.status(400).json({ status: 400, message: 'Invalid query!!', info: 'Available takes boolen parameters.' });
        }

        // queries for mongoDB to fetch users 
        const mongoQuery = {
            ...searchQuery,
            ...filterQuery,
        }

        // to store users data page wise;
        const data = await User.find(mongoQuery).skip(skip).limit(limit);

        // send the user as response
        return res.status(200).json({
            status: 200,
            message: "User Found!",
            totalResults: data.length,
            totalUsers: users.length,
            user: data
        });

    } catch (err) {  // unrecogonized errors
        console.error(err);
        return res.status(500).json({ status: 500, message: "Internal Server Error!" });
    }
};

// delete the user
const deleteUser = async (req, res) => {
    try {
        // fetch the user id from query param
        const userId = req.params.id;

        // check that the user exists or not
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ status: 404, message: "User not found!!" });

        // now, delete the user avatar
        const imgPath = 'public/uploads/' + 'avatar_' + user.avatar.split('avatar_').at(-1);  // slicing the avatar url to fetch the path of the image

        // now, delete the old image
        if (fs.existsSync(imgPath)) {  // Check if the file exists
            // Delete the file
            fs.unlinkSync(imgPath);
        }

        // now, delete the user
        await User.findByIdAndDelete(userId);
        return res.status(200).json({ status: 200, message: "User Deleted!!", userId: userId });

    } catch (err) {  // unrecogonized errors
        return res.status(500).json({ status: 500, message: "Internal Server Error!" });
    }
};


// export all the controllers method
module.exports = { createUser, updateUser, fetchSingleUser, fetchAllUsers, deleteUser };