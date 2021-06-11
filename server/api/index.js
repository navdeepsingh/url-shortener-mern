var express = require("express");
var app = express();
var router = express.Router();
var controller = require("./controller");

router.get("/status", controller.getApiStatus);
router.get("/urls", controller.getUrls);

module.exports = router;
