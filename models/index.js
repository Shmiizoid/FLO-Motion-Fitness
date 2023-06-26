// Require the Mongoose package & your environment configuration
const mongoose = require('mongoose');
require('dotenv').config()
const mongodbUri = process.env.MONGODBURI;

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODBURI);
const db = mongoose.connection

db.on('connected', function () {
    console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`);
});

// Export models and seed data to `server.js`
module.exports = {
    Workout: require('./workout'),
    seedWorkouts: require('./seed')
}
