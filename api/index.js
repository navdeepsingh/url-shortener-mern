var express = require("express");
var app = express();
var router = express.Router();
var controller = require("./controller");

//This is an API to get all users from Users table
//The http/s URL of this API will be  "hostname|IP/api/getUsers" e.g "http://mywebapp.com/api/getUsers"

router.get("/status", controller.getApiStatus);
router.get("/urls", controller.getUrls);

module.exports = router;
