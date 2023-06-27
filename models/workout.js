// Require the Mongoose package
const mongoose = require('mongoose');
const applicationSchema = require('./review.js')

// Create a schema to define the properties of the workouts collection
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
    
    	// the reviews array can only accept objects that match the criteria specified
    // in the reviewSchema. In other words, the reviews array can only accept reviews
	reviews: [reviewSchema]
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Workout', workoutSchema);
