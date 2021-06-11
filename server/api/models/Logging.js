const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const Logging = new Schema(
  {
    ip_address: {
      type: String,
      required: true,
    },
    user_agent: {
      type: String,
      required: true,
    },
    url: {
      type: Schema.Types.ObjectId,
      ref: "Url",
    },
  },
  {
    strict: true,
  }
);

module.exports = Mongoose.model("logging", Logging);
