// Carbon emission gram per km
const CARBON_EMISSION_PER_METER = {
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
  DRIVING: 0.0966,
  BICYCLING: 0.002,
};
const FIXED_TRAVEL_MODES = ['WALKING', 'DRIVING', 'BICYCLING'];

module.exports = {
  CARBON_EMISSION_PER_METER,
  FIXED_TRAVEL_MODES,
};
