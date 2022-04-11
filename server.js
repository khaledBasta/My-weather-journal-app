// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening() {
  // console.log(server);
  console.log(`server is running on localhost: http://localhost:${port}`);
}

// get request
app.get("/getData", (req, res) => {
  res.send(projectData);
});

// post request
app.post("/sendData", (req, res) => {
  projectData = req.body;
  res.send(projectData);
});
