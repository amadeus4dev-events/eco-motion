const axios = require('axios');

const { calculate_carbon_emissions } = require('./utilities');
const default_config = {
  method: 'get',
  url: process.env.CUSTOMCONNSTR_GOOGLE_URL,
  headers: {},
};

const default_params = {
  key: process.env.CUSTOMCONNSTR_GOOGLE_KEY,
  alternatives: true,
};

// Get method with url filters inserted
const get_road = () => async (context, req) => {
  var config = {
    ...default_config,
    params: { ...req.query, ...default_params },
  };
  return axios(config)
    .then(function (response) {
      context.res = {
        status: 200,
        body: calculate_carbon_emissions(response.data),
      };
    })
    .catch(function (error) {
      context.res = { status: 500, body: error };
    });
};

module.exports = { get_road };
