
const express = require('express')
const router = express.Router()
const db = require('../models')


//Index
router.get('/', (req, res) => {
	db.Workout.find({}, { reviews: true, _id: false })
        .then(workouts => {
	    	const flatList = []
	    	for (let workout of workouts) { flatList.push(...workout.reviews) }
            res.render('reviews/rev-index', { revs: flatList })
		}
	)
});

//New
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
// Create
router.post('/create/:workoutId', (req, res) => {
    db.Workout.findByIdAndUpdate(
        req.params.workoutId,
        { $push: { reviews: req.body } },
        { new: true }
        )
        .then(() => res.redirect('/workouts/' + req.params.workoutId))
});

// Show
router.get('/:id', (req, res) => {
    db.Workout.findOne(
        { 'reviews._id': req.params.id },
        { 'reviews.$': true, _id: false }
    )
        .then(workout => {
            res.render('reviews/rev-details', { rev: workout.reviews[0] })
        })
});

// Destroy Route
router.delete('/:id', (req, res) => {
    db.Workout.findOneAndUpdate(
        { 'reviews._id': req.params.id },
        { $pull: { reviews: { _id: req.params.id } } },
        { new: true }
    )
        .then(workout => res.redirect('/workouts/' + workout._id))
});

module.exports = router
