const { CARBON_EMISSION_PER_METER, FIXED_TRAVEL_MODES } = require('./config');

// Used to calculate the carbon offset of the road
function CO2(steps) {
  var total_emission = 0;
  steps.map((step) => {
    total_emission +=
      CARBON_EMISSION_PER_METER[
        FIXED_TRAVEL_MODES.includes(step.travel_mode)
          ? step.travel_mode
          : step.transit_details.line.vehicle.type
      ] * step.distance.value;
  });
  return parseFloat((total_emission / 1000).toFixed(2));
}

function calculate_carbon_emissions(data) {
  data.routes.map((route) => (route.co2 = CO2(route.legs[0].steps)));
  return data;
}

module.exports = {
  calculate_carbon_emissions,
};
