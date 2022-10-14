const mongoose = require('mongoose');
let db = null;
const connect = () => {
  if (db == null) {
    mongoose.connect(process.env.CUSTOMCONNSTR_MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  }
};

module.exports = { connect, connection: db };
