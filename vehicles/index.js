// Model is imported
const { Vehicle } = require('../models/vehicle.model');
const {
  get,
  post,
  insert_many,
  destroy,
  put,
  get_one,
} = require('../services/default');

var executeMap = {
  GET: get(Vehicle),
  POST: post(Vehicle),
  insert_many: insert_many(Vehicle),
  DELETE: destroy(Vehicle),
  PUT: put(Vehicle),
  GET_ONE: get_one(Vehicle),
};
module.exports = async function (context, req) {
  if (executeMap[req.method]) return executeMap[req.method](context, req);
};
