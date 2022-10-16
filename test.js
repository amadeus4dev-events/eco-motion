db.getCollection('stats').aggregate([
  { $match: { deviceID: '5B1E7720-C276-4683-8214-1367D83D4067' } },
  {
    $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
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
  { $project: { preffered: 1, optimal: 1, _id: 1 } },
]);
