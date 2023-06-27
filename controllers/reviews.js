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
// Index Route (All Applications): 
// GET localhost:3000/applications/
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

// New Route: GET localhost:3000/applications/new
router.get('/new/:petId', (req, res) => {
    res.send('You\'ve reached the new route. You\'ll be making a new application for pet ' + req.params.petId)
})

// Create Route: POST localhost:3000/applications/
router.post('/create/:petId', (req, res) => {
    db.Pet.findByIdAndUpdate(
        req.params.petId,
        { $push: { applications: req.body } },
        { new: true }
    )
        .then(pet => res.json(pet))
});

// Show Route: GET localhost:3000/applications/:id
router.get('/:id', (req, res) => {
    db.Pet.findOne(
        { 'applications._id': req.params.id },
        { 'applications.$': true, _id: false }
    )
        .then(pet => {
	        // format query results to appear in one object, 
	        // rather than an object containing an array of one object
            res.json(pet.applications[0])
        })
});

// Destroy Route: DELETE localhost:3000/applications/:id
router.delete('/:id', (req, res) => {
    db.Pet.findOneAndUpdate(
        { 'applications._id': req.params.id },
        { $pull: { applications: { _id: req.params.id } } },
        { new: true }
    )
        .then(pet => res.json(pet))
});


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
