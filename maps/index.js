// Model is imported
const { get_road, get_all_roads } = require('../services/maps/maps.service');

var executeMap = { GET: get_road(), GET_ALL_ROADS: get_all_roads() };
module.exports = async function (context, req) {
  if (executeMap[req.method]) return executeMap[req.method](context, req);
};
