// importing requirements


// to create an user
const createUser = async (req, res) => {
    try {
        // fetching all the details from request body
        const { email, gender, avatar, domail, available } = req.body;
        const firstName = req.body.first_name;
        const lastName = req.body.last_name;
        console.log(req.body)

        res.send(req.file);
        
    } catch (err) {  // unrecogonized errors
        return res.status(500).json({ status: 500, message: "Internal Server Error!" });
    }
};


// export all the controllers method
module.exports = { createUser };