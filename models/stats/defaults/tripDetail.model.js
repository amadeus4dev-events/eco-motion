const { Schema } = require('mongoose');

// Schema for tripDetail representation of objects.
module.exports = tripDetailSchema = new Schema({
  _id: false,
  distance: {
    type: Number,
  },
  duration: { type: Number },
  travelMode: {
    type: String,
  },
  CO2: {
    type: Number,
  },
});
