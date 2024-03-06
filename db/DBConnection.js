
// code to code DB

const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB;