// importing requirements
const connectToMongo = require("./connectionDB/db");
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { port, apiPath, domain } = require("./constants");


// connecting to database
connectToMongo();

// development environment specifications
const app = express();
const PORT = port || 2100;
const APIPATH = apiPath;  // this can be any string, a starting path for the API

// to use req.body, we have to use this middleware
app.use(express.json());
app.use(cors());

// available routes for API
app.use(APIPATH + 'users', require('./routes/user.js'));
app.use(APIPATH + 'filter', require('./routes/filterUser.js'));
app.use('/avatar', express.static('public/uploads'));  // making images static so that the user can also access

// running the app
app.listen(PORT, () => {
    console.log(`App listening on port ${domain}:${PORT}`);
});