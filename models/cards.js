const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    DateTime: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardsSchema);
