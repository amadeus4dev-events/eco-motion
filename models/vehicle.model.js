const { Schema, model } = require('mongoose');

const vehicleSchema = new Schema(
  {},
  {
    timestamps: true,
  }
);

module.exports = model('vehicles', vehicleSchema);
