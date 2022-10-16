const db = require('../../connection/db');
function filter_stats(docs) {
  const constants_fiels = [
    ['preffered', 'optimal'],
    ['distance', 'duration', 'CO2'],
  ];
  var totals = {
    preffered: { distance: 0, duration: 0, CO2: 0 },
    optimal: { distance: 0, duration: 0, CO2: 0 },
  };
  docs.map((doc) => {
    constants_fiels[0].map((road_type) => {
      constants_fiels[1].map((calculation_type) => {
        totals[road_type][calculation_type] += doc[road_type][calculation_type];
      });
    });
  });
  return {
    weekly: docs,
    overall: totals,
  };
}
// Get method with url filters inserted
const get_stats = (Type) => async (context, req) => {
  db.connect();
  var curr = new Date();
  var lastday = new Date(curr);
  var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() - 6));
  const filter = {
    createdAt: { $gte: firstday, $lt: lastday },
  };
  return Type.aggregate([
    { $match: { ...req.query, ...filter } },
    {
      $group: {
        _id: '$createdAt',
        preffered_distance: { $sum: '$preffered.distance' },
        preffered_duration: { $sum: '$preffered.duration' },
        preffered_CO2: { $sum: '$preffered.CO2' },
        optimal_distance: { $sum: '$optimal.distance' },
        optimal_duration: { $sum: '$optimal.duration' },
        optimal_CO2: { $sum: '$optimal.CO2' },
      },
    },
    {
      $addFields: {
        day_of_week: { $dayOfWeek: { date: '$_id' } },
        preffered: {
          distance: '$preffered_distance',
          duration: '$preffered_duration',
          CO2: '$preffered_CO2',
        },
        optimal: {
          distance: '$optimal_distance',
          duration: '$optimal_duration',
          CO2: '$optimal_CO2',
        },
      },
    },
    { $project: { preffered: 1, optimal: 1, _id: 1, day_of_week: 1 } },
  ])
    .then((docs) => {
      context.res = { status: 200, body: filter_stats(docs) };
    })
    .catch((err) => {
      context.res = { status: 500, body: err };
    });
};

module.exports = {
  get_stats,
};
