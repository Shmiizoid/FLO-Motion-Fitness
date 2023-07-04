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
    photo: { type: String, default: "https://cdn1.iconfinder.com/data/icons/smashicons-fitness-yellow/60/26_-Love_Gym-_Yellow-512.png" },
    //Reviews added[array]
	reviews: [reviewSchema]
});

module.exports = mongoose.model('Workout', workoutSchema);
