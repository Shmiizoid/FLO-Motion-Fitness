const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewName: {
    type: String,
    required: true
  },
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
