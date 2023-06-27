/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/workouts`
---------------------------------------------------------------------------------------
*/


/* Require modules
--------------------------------------------------------------- */
const express = require('express')
const router = express.Router()


/* Require the db connection, and models
--------------------------------------------------------------- */
const db = require('../models')


/* Routes
--------------------------------------------------------------- */
// Index Route (GET/Read): Will display all workouts
router.get('/', function (req, res) {
    db.Workout.find({})
        .then(workouts => {
            res.render('workout-index', {
                workouts: workouts
            })
        })
})

// New Route (GET/Read): This route renders a form 
// which the user will fill out to POST (create) a new location
router.get('/new', (req, res) => {
    res.render('new-form')
})

// Create Route (POST/Create): This route receives the POST request sent from the new route,
// creates a new workout document using the form data, 
// and redirects the user to the new workout's show page
router.post('/', (req, res) => {
    db.Workout.create(req.body)
    .then(workout => res.redirect('/workouts/' + workout._id))
})

// Edit Route (GET/Read): This route renders a form
// the user will use to PUT (edit) properties of an existing workout
router.get('/:id/edit', (req, res) => {
    db.Workout.findById(req.params.id)
        .then(workout => res.render('edit-form', { workout: workout }))
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route, 
// edits the specified workout document using the form data,
// and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(workout => res.redirect('/workouts/' + workout._id))
})

// Destroy Route (DELETE/Delete): This route deletes a workout document 
// using the URL parameter (which will always be the workout document's ID)
router.delete('/:id', (req, res) => {
    db.Workout.findByIdAndRemove(req.params.id)
        .then(workout => res.redirect('/workouts'))
})

// Show Route (GET/Read): Will display an individual workout document
// using the URL parameter (which is the document _id)
router.get('/:id', function (req, res) {
    db.Workout.findById(req.params.id)
        .then(workout => {
            res.render('workout-details', {
                workout: workout
            })
        })
        .catch(() => res.render('404'))
})


/* Export these routes so that they are accessible in `server.js`
--------------------------------------------------------------- */
module.exports = router
