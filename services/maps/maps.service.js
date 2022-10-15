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
const travel_modes = ['transit', 'driving', 'walking', 'bicycling'];
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

// Draw road by transit car walking bicycling
const get_all_roads = () => async (context, req) => {
  var all_call = [];
  travel_modes.map((mode) =>
    all_call.push(
      axios({
        ...default_config,
        params: { ...req.query, ...default_params, mode: mode },
      })
    )
  );
  return axios
    .all(all_call)
    .then(
      axios.spread((...response) => {
        var result = {};
        travel_modes.map(
          (mode, index) =>
            (result[mode] = calculate_carbon_emissions(response[index].data))
        );
        context.res = {
          status: 200,
          body: result,
        };
      })
    )
    .catch((errors) => {
      context.res = { status: 500, body: errors };
    });
};

module.exports = { get_road, get_all_roads };
