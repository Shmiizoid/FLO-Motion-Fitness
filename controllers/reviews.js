/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/applications`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
// Router allows us to handle routing outisde of server.js
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (All Reviews): 
// GET localhost:3000/reviews/
router.get('/', (req, res) => {
	db.Workout.find({}, { reviews: true, _id: false })
        .then(workouts => {
		    // format query results to appear in one array, 
		    // rather than an array of objects containing arrays 
	    	const flatList = []
	    	for (let workout of workouts) {
	        	flatList.push(...workout.reviews)
	    	}
	    	res.json(flatList)
		}
	)
});

// New Route: GET localhost:3000/reviews/new
router.get('/new/:workoutId', (req, res) => {
    res.send('You\'ve reached the new route. You\'ll be making a new review for workout ' + req.params.workoutId)
})

// Create Route: POST localhost:3000/reviews/
router.post('/create/:workoutId', (req, res) => {
    db.Workout.findByIdAndUpdate(
        req.params.workoutId,
        { $push: { reviews: req.body } },
        { new: true }
    )
        .then(workout => res.json(workout))
});

// Show Route: GET localhost:3000/applications/:id
router.get('/:id', (req, res) => {
    db.Workout.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(workout => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            res.json(workout.reviews[0])
        })
});

// Destroy Route: DELETE localhost:3000/applications/:id
router.delete('/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(workout => res.json(workout))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
