// Model is imported
const { get_road_transit } = require('../services/maps/maps.service');

var executeMap = { GET_TRANSIT: get_road_transit() };
module.exports = async function (context, req) {
  if (executeMap[req.method]) return executeMap[req.method](context, req);
};
