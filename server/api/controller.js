const Url = require("./models/Url");
const Logging = require("./models/Logging");

const getApiStatus = (req, res, next) => {
  return res.status(200).send({ message: "API Working" });
};

const getUrls = (req, res, next) => {
  Url.find({})
    .then((urls) => {
      if (urls !== null) {
        res.status(200).send(urls);
      } else {
        res.status(401).send({ message: "No Urls exists" });
      }
    })
    .catch((err) => res.status(401).send({ message: err }));
};

const addUrl = (req, res, next) => {
  const data = {
    full: req.body.fullUrl,
    logging_enabled: req.body.enableLogging,
    expire: req.body.expire,
  };
  Url.findOne({ full: data.full }).then((shortUrl) => {
    if (shortUrl != null) {
      // If already exists
      res.status(401).send({ message: "Url already exists." });
    } else {
      // Create new short url
      new Url(data)
        .save()
        .then((shortUrl) => {
          res.status(200).send(shortUrl);
        })
        .catch((err) => {
          console.log(err);
          res.status(401).send({ message: err.message });
        });
    }
  });
};

const updateUrl = (req, res, next) => {
  const dataToBeUpdated = {
    title: req.body.title,
    description: req.body.description,
  };
  Appointment.findOneAndUpdate({ _id: req.body._id }, dataToBeUpdated, {
    new: true,
  })
    .then((appointment) => {
      if (appointment != null) {
        res.status(200).send(appointment);
      } else {
        res.status(401).send({ message: "Appointment not updated" });
      }
    })
    .catch((err) =>
      res.status(401).send({ message: `Update failed with error: ${err}` })
    );
};

const deleteUrl = (req, res, next) => {
  const entityToBeDeleted = {
    _id: req.body._id,
  };
  Appointment.deleteOne(entityToBeDeleted)
    .then((result) =>
      res.status(200).send({ message: `Deleted ${result.deletedCount} item` })
    )
    .catch((err) =>
      res.status(401).send({ message: `Delete failed with error: ${err}` })
    );
};

const getShortUrl = (req, res, next) => {
  const { short } = req.params;
  Url.findOne({ short }).then((shortUrl) => {
    // @TODO check if it expires then also show 400 error page
    if (!shortUrl) {
      res.status(400).send({ message: "Oops! Page not found" });
      return;
    }
    res.status(200).redirect(shortUrl.full);
  });
};

module.exports = {
  getApiStatus: getApiStatus,
  getUrls: getUrls,
  addUrl: addUrl,
  updateUrl: updateUrl,
  deleteUrl: deleteUrl,
  getShortUrl: getShortUrl,
};
