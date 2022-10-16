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
function find_smallest_by_field(routes, field) {
  let smallest = 100000;
  routes.map((route) => (smallest = Math.min(route[field], smallest)));
  routes.map((route) => {
    if (route[field] == smallest) {
      route.priorities[field] = true;
    }
  });
  return routes;
}
// Used to get the sorted values by co2 and duration
function get_sorted_by_field(routes) {
  let result = [[], []];
  routes.map((route) => {
    route.duration = route.legs[0].duration.value;
    route.priorities = {
      duration: false,
      co2: false,
      optimal: false,
    };
    result[0].push(route.duration);
    result[1].push(route.co2);
  });
  const durations = Array.from(new Set(result[0])).sort();
  const co2s = Array.from(new Set(result[1])).sort();
  routes.map(
    (route) =>
      (route.optimal =
        durations.indexOf(route.duration) + co2s.indexOf(route['co2']))
  );

  const priorities = ['duration', 'co2', 'optimal'];
  priorities.map((priority) => {
    routes = find_smallest_by_field(routes, priority);
  });
  return routes;
}
// Used to calculate the carbon emission and sort
function calculate_carbon_emissions(data) {
  data.routes.map((route) => (route.co2 = CO2(route.legs[0].steps)));
  data.routes = get_sorted_by_field(data.routes);

  return data;
}

module.exports = {
  calculate_carbon_emissions,
};
