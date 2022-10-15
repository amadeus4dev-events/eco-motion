const axios = require('axios');

const { calculate_carbon_emissions } = require('./utilities');

// Get method with url filters inserted
const get_road = () => async (context, req) => {
  var params = { ...req.query, key: process.env.CUSTOMCONNSTR_GOOGLE_KEY };

  var config = {
    method: 'get',
    url: process.env.CUSTOMCONNSTR_GOOGLE_URL,
    headers: {},
    params: params,
  };

  return axios(config)
    .then(function (response) {
      response.data.routes = calculate_carbon_emissions(response.data.routes);
      context.res = { status: 200, body: response.data };
    })
    .catch(function (error) {
      context.res = { status: 500, body: error };
    });
};

module.exports = {
  get_road,
};
