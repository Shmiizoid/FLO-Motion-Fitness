const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewName: {
    type: String,
    required: true
  },
  //time for workout completion in minutes
  reviewTime: {
    type: Number,
    required: true
  },
  reviewCons: {
    type: String,
    required: true
  },
  reviewPros: {
    type: String,
   required: true
  },
  reviewDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = reviewSchema;


//add workout id to index?
//edit, add edit pencil to button
//API for workouts?
