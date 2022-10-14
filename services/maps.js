const axios = require('axios');
// Get method with url filters inserted
const get_road = () => async (context, req) => {
  var config = {
    method: 'get',
    url: process.env.CUSTOMCONNSTR_GOOGLE_URL,
    headers: {},
    params: { ...req.query, key: process.env.CUSTOMCONNSTR_GOOGLE_KEY},
  };

  return axios(config)
    .then(function (response) {
      context.res = { status: 200, body: response.data };
    })
    .catch(function (error) {
      context.res = { status: 500, body: error };
    });
};

module.exports = {
  get_road,
};
