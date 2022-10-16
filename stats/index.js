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

const { get_stats } = require('../services/stats/stats.service');

var executeMap = {
  GET: get(Stats),
  POST: post(Stats),
  INSERT_MANY: insert_many(Stats),
  DELETE: destroy(Stats),
  PUT: put(Stats),
  GET_ONE: get_one(Stats),
  GET_STATS: get_stats(Stats)
};
module.exports = async function (context, req) {
  if (executeMap[req.method]) return executeMap[req.method](context, req);
};
