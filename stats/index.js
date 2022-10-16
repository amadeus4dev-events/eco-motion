// Model is imported
const Stats = require('../models/stats/stats.model');
const {
  get,
  post,
  insert_many,
  destroy,
  put,
  get_one,
} = require('../services/default.service');

var executeMap = {
  GET: get(Stats),
  POST: post(Stats),
  insert_many: insert_many(Stats),
  DELETE: destroy(Stats),
  PUT: put(Stats),
  GET_ONE: get_one(Stats),
};
module.exports = async function (context, req) {
  if (executeMap[req.method]) return executeMap[req.method](context, req);
};
