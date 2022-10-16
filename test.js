db.getCollection('stats').aggregate([
  { $match: { deviceID: '5B1E7720-C276-4683-8214-1367D83D4067' } },
  {
    $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      preffered: {
        $addToSet: {
          distance: { $sum: '$preffered.distance' },
          duration: { $sum: '$preffered.duration' },
          CO2: { $sum: '$preffered.CO2' },
        },
      },
      optimal: {
        $addToSet: {
          distance: { $sum: '$optimal.distance' },
          duration: { $sum: '$optimal.duration' },
          CO2: { $sum: '$optimal.CO2' },
        },
      },
    },
  },
]);
