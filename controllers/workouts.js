//Require models
const express = require('express')
const router = express.Router()


//Requires CB collection
const db = require('../models')

//Index
router.get('/', function (req, res) {
    db.Workout.find({})
        .then(workouts => {
            res.render('workout-index', {
                workouts: workouts
            })
        })
})

//New
router.get('/new', (req, res) => {
    res.render('new-form')
})

//Create
router.post('/', (req, res) => {
    db.Workout.create(req.body)
    .then(workout => res.redirect('/workouts/' + workout._id))
})

//Edit
router.get('/:id/edit', (req, res) => {
    db.Workout.findById(req.params.id)
        .then(workout => res.render('edit-form', { workout: workout }))
})

//Update
router.put('/:id', (req, res) => {
    db.Workout.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
        .then(workout => res.redirect('/workouts/' + workout._id))
})

//Destroy
router.delete('/:id', (req, res) => {
    db.Workout.findByIdAndRemove(req.params.id)
        .then(workout => res.redirect('/workouts'))
})

//Show
router.get('/:id', function (req, res) {
    db.Workout.findById(req.params.id)
        .then(workout => {
            res.render('workout-details', {
                workout: workout
            })
        })
        .catch(() => res.render('404'))
})


module.exports = router
