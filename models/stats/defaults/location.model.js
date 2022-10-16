const { Schema } = require('mongoose');

// Schema for location representation of objects.
module.exports = locationSchema = new Schema({
  _id: false,
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
});
