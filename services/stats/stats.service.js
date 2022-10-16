const db = require('../../connection/db');

// Get method with url filters inserted
const get_stats = (Type) => async (context, req) => {
  db.connect();
  var curr = new Date();
  var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() - 6));
  var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));
  const filter = {
    createdAt: { $gte: firstday, $lt: lastday },
  };
  console.log(filter);
  return Type.aggregate([
    { $match: { ...req.query, ...filter } },
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
  ])
    .then((docs) => {
      context.res = { status: 200, body: docs };
    })
    .catch((err) => {
      context.res = { status: 500, body: err };
    });
};
module.exports = {
  get_stats,
};
