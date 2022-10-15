// Model is imported
const { get_road } = require('../services/maps/maps.service');

var executeMap = { GET: get_road() };
module.exports = async function (context, req) {
  if (executeMap[req.method]) return executeMap[req.method](context, req);
};
