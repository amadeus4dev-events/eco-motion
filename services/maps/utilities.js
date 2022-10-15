// Carbon emission gram per km
const carbon_emission_per_meter = {
  BUS: 0.0966,
  WALKING: 0.0002,
  SUBWAY: 0.0034,
  CAR: 0.166,
  METRO_RAIL: 0.0034,
  CABLE_CAR: 0.166,
  COMMUTER_TRAIN: 0.0034,
  FERRY: 0.02,
  FUNICULAR: 0.166,
  GONDOLA_LIFT: 0.0034,
  HEAVY_RAIL: 0.0034,
  HIGH_SPEED_TRAIN: 0.0034,
  INTERCITY_BUS: 0.0966,
  LONG_DISTANCE_TRAIN: 0.0034,
  MONORAIL: 0.02,
  OTHER: 0.05,
  RAIL: 0.0034,
  SHARE_TAXI: 0.166,
  TRAM: 0.0034,
  TROLLEYBUS: 0.0034,
};

// Used to calculate the carbon offset of the road
function CO2(steps) {
  var total_emission = 0;
  steps.map(
    (step) =>
      (total_emission +=
        carbon_emission_per_meter[
          step.travel_mode === 'WALKING'
            ? 'WALKING'
            : step.transit_details.line.vehicle.type
        ] * step.distance.value)
  );
  return parseFloat((total_emission / 1000).toFixed(2));
}

function calculate_carbon_emissions(routes) {
  routes.map((route) => (route.co2 = CO2(route.legs[0].steps)));
  return routes;
}

module.exports = {
  CO2,
  calculate_carbon_emissions,
};
