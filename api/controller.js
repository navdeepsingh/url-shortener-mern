const Urls = require("./models/Url");
const Logging = require("./models/Logging");

const getApiStatus = (req, res, next) => {
  return res.status(200).send({ message: "API Working" });
};

const getUrls = (req, res, next) => {
  Urls.find({})
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
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
  };
  Appointment.findOne({ date: data.date }).then((appointment) => {
    if (appointment != null) {
      // If already exists
      res.status(401).send({ message: "Appointment already exists." });
    } else {
      // Create new appointment
      new Appointment(data)
        .save()
        .then((appointment) => {
          res.status(200).send(appointment);
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

module.exports = {
  getApiStatus: getApiStatus,
  getUrls: getUrls,
  addUrl: addUrl,
  updateUrl: updateUrl,
  deleteUrl: deleteUrl,
};
