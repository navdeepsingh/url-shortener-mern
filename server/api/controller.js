const Mongoose = require("mongoose");
const Url = require("./models/Url");
const Logging = require("./models/Logging");
const moment = require("moment");

const getApiStatus = (req, res, next) => {
  return res.status(200).send({ message: "API Working" });
};

const getUrls = async (req, res, next) => {
  const response = await Url.find({}).sort({ createdAt: -1 });
  res.status(200);
  res.json(response);
};

const addUrl = async (req, res, next) => {
  const { fullUrl: full, enableLogging: logging_enabled, expire } = req.body;
  const data = { full, logging_enabled, expire };

  if (typeof full !== "string") {
    res.status(400);
    res.json({ message: "invalid 'text' expected string" });
    return;
  }

  Url.findOne({ full }).then((shortUrl) => {
    if (shortUrl != null) {
      // If already exists
      res.status(401).send({ message: "Url already exists." });
    } else {
      // Create new short url
      new Url(data)
        .save()
        .then((shortUrl) => {
          console.log(shortUrl);
          res.status(200).send(shortUrl);
        })
        .catch((err) => {
          console.log(err);
          res.status(401).send({ message: err.message });
        });
    }
  });
};

const deleteUrl = (req, res, next) => {
  const entityToBeDeleted = {
    id: req.params.id,
  };
  Url.deleteOne(entityToBeDeleted)
    .then((result) =>
      res.status(200).send({ message: `Deleted ${result.deletedCount} item` })
    )
    .catch((err) =>
      res.status(401).send({ message: `Delete failed with error: ${err}` })
    );
};

const getLogging = async (req, res, next) => {
  const { id } = req.params;
  const url = await Url.findById(Mongoose.Types.ObjectId(id)).populate(
    "loggings"
  );
  const logData = [];
  for (const logId of url.logging) {
    const logObject = await Logging.findById(logId);
    logData.push(logObject);
  }
  res.send(logData);
};

const getShortUrl = (req, res, next) => {
  const { short } = req.params;
  Url.findOne({ short }).then(async (shortUrl) => {
    /**
     * Check if short url is exists in database or not
     */
    if (!shortUrl) {
      res.status(404).send({ message: "Oops! Page not found" });
      return;
    }

    /**
     * Check for link expiration
     */
    const { _id, expire } = shortUrl;
    if (expire !== null) {
      const isExpire = moment(expire).diff(moment(), "minutes") <= 0;
      if (isExpire) {
        res.status(401).send({ message: "Sorry! Link Expired" });
        return;
      }
    }

    /**
     * Log the data
     */
    const logging = await Logging.create({
      ip_address: req.connection.remoteAddress,
      user_agent: req.get("User-Agent"),
      url: Mongoose.Types.ObjectId(_id),
    });
    await logging.save();

    const urlById = await Url.findById(Mongoose.Types.ObjectId(_id));

    urlById.logging.push(logging);
    await urlById.save();

    res.status(200).redirect(shortUrl.full);
  });
};

module.exports = {
  getApiStatus: getApiStatus,
  getUrls: getUrls,
  addUrl: addUrl,
  deleteUrl: deleteUrl,
  getLogging: getLogging,
  getShortUrl: getShortUrl,
};
