
// const moongoose = require('mongoose');
// moongoose.connect('mongodb://127.0.0.1:27017/TechPrimeLabAssignment');

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/TechPrimeLabAssignment', {
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
