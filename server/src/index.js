// importing requirements
const connectToMongo = require("./connectionDB/db");
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require("cors");
const { port, apiPath } = require("./constants");


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


// running the app
app.listen(PORT, () => {
    console.log(`TODO app listening on port http://localhost:${PORT}`);
});