require("dotenv").config();
var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
const { getShortUrl } = require("./api/controller");
var app = express();

//If there is a .env file so it will read PORT variable if not then 5000
const PORT = process.env.PORT || 5000;

//To avoid that stupid deprecated warning
mongoose.Promise = global.Promise;

require("./api/models/Url");
require("./api/models/Logging");

mongoose
  .connect(process.env.DATABASE_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(console.log(`MongoDB connected`))
  .catch((err) => console.log(err));

//We will be connecting the express REST APIs with our front end so we need CORS config for it
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(require("cors")());
//body parser middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("*", express.static("../client/build"));

app.use("/api", require("./api"));
app.get("/:short", getShortUrl);

app.listen(PORT, function () {
  console.log("Running server on " + PORT);
});
