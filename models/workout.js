const mongoose = require('mongoose');
const reviewSchema = require('./review.js')

//Workout Schema
const workoutSchema = new mongoose.Schema({
    name: { type: String, required: true },
    exercises: { type: Number, min: 0, required: true },
    sets: { type: Number, min: 0, required: true },
    reps: { type: Number, min: 0, required: true },
    equipment: { type: String, required: false },
    cardio: { type: Number, required: false },
    cardioAmount: { type: Number, required: false },
    description: { type: String, required: true },
    photo: { type: String, default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVtGzPWhGzjCb6RvCD9V_f8y-u5kHR1TXf9nTTwwgDoCoWYHQYK--fpYzjiTY8YD3ykXY&usqp=CAU" },
    //Reviews added[array]
	reviews: [reviewSchema]
});

module.exports = mongoose.model('Workout', workoutSchema);
