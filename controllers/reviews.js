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
	    	for (let workout of workouts) { flatList.push(...workout.reviews) }
            res.render('reviews/rev-index', { revs: flatList })
		}
	)
});

// New Route: GET localhost:3000/reviews/new
router.get('/new/:workoutId', (req, res) => {
    db.Workout.findById(req.params.workoutId)
        .then(workout => {
            if (workout) {
                res.render('reviews/new-form.ejs', { workout: workout })
            } else {
                res.render('404')
            }
        })
})
// Create Route: POST localhost:3000/reviews/
router.post('/create/:workoutId', (req, res) => {
    db.Workout.findByIdAndUpdate(
        req.params.workoutId,
        { $push: { reviews: req.body } },
        { new: true }
        )
        .then(() => res.redirect('/workouts/' + req.params.workoutId))
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
            res.render('reviews/rev-details', { rev: workout.reviews[0] })
        })
});

// Destroy Route: DELETE localhost:3000/applications/:id
router.delete('/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(workout => res.redirect('/workouts/' + workout._id))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
