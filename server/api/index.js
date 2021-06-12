var express = require("express");
var app = express();
var router = express.Router();
var controller = require("./controller");

router.get("/status", controller.getApiStatus);
router.get("/urls", controller.getUrls);
router.post("/url", controller.addUrl);
router.delete("/url/:id", controller.deleteUrl);
router.get("/logging/:id", controller.getLogging);

module.exports = router;
