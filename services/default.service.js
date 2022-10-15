const db = require('../connection/db');

// Get method with url filters inserted
const get = (Type) => async (context, req) => {
  db.connect();
  return Type.find(req.query)
    .then((docs) => {
      context.res = { status: 200, body: docs };
    })
    .catch((err) => {
      context.res = { status: 500, body: err };
    });
};
// To post a single data
const post = (Type) => async (context, req) => {
  db.connect();
  var newObj = new Type(req.body);
  return newObj
    .save()
    .then((docs) => {
      context.res = { status: 200, body: docs };
    })
    .catch((err) => {
      console.log(err);
      context.res = { status: 500, body: err };
    });
};

// Insert Many data from file or json array
const insert_many = (Type) => (context, req) => {
  db.connect();
  return Type.insertMany(req.body)
    .then((docs) => {
      context.res = { status: 200, body: docs };
    })
    .catch((err) => {
      context.res = { status: 500, body: err };
    });
};

// Used to Update object
const put = (Type) => async (context, req) => {
  db.connect();
  return Type.findOneAndUpdate({ _id: req.params.id }, req.body)
    .setOptions({
      new: true,
      overwrite: false,
    })
    .then((docs) => {
      context.res = { status: 200, body: docs };
    })
    .catch((err) => {
      context.res = { status: 500, body: err };
    });
};
// Used tp Delete object
const destroy = (Type) => async (context, req) => {
  db.connect();
  return Type.findOneAndDelete({ _id: req.params.id })
    .then((docs) => {
      context.res = { status: 200, body: docs };
    })
    .catch((err) => {
      context.res = { status: 500, body: err };
    });
};

// Get by id of object
const get_one = (Type) => async (context, req) => {
  db.connect();
  return Type.findById(req.params.id)
    .then((docs) => {
      context.res = { status: 200, body: docs };
    })
    .catch((err) => {
      context.res = { status: 500, body: err };
    });
};

module.exports = {
  get,
  post,
  insert_many,
  destroy,
  put,
  get_one,
};
