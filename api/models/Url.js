const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const { nanoid } = require("nanoid");

const Url = new Schema(
  {
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    expire: {
      type: Date,
      required: false,
    },
    logging_enabled: {
      type: Boolean,
      required: false,
    },
    logging: [
      {
        type: Schema.Types.ObjectId,
        ref: "Logging",
      },
    ],
  },
  {
    strict: true,
  }
);

module.exports = Mongoose.model("urls", Url);
