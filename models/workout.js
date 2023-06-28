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
    isFeatured: { type: Boolean, default: false },
    photo: { type: String, required: false },
    //Reviews added[array]
	reviews: [reviewSchema]
});

module.exports = mongoose.model('Workout', workoutSchema);
