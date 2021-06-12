const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const { nanoid } = require("nanoid");
const { v4: uuidv4 } = require("uuid");

const Url = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: () => uuidv4(),
    },
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      unique: true,
      default: () => nanoid(8),
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
    timestamps: true,
  }
);

module.exports = Mongoose.model("urls", Url);
