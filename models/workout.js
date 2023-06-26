// Require the Mongoose package
const mongoose = require('mongoose');

// Create a schema to define the properties of the pets collection
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
    
});

// Export the schema as a Monogoose model. 
// The Mongoose model will be accessed in `models/index.js`
module.exports = mongoose.model('Workout', workoutSchema);
