const { Schema, model } = require('mongoose');

const { tripDetailSchema, locationSchema } = require('./defaults');

const statSchema = new Schema(
  {
    // Device ID
    deviceID: {
      type: String,
    },
    preffered: tripDetailSchema,
    optimal: tripDetailSchema,
    startLocation: locationSchema,
    endLocation: locationSchema,
    travelMode: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Stats', statSchema);
