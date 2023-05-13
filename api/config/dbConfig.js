const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch(error){
    throw new error;
  }
}
module.exports = connectDB;