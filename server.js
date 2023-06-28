require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');

const db = require('./models');
const app = express();

//Controllers
const workoutsCtrl = require('./controllers/workouts')
const revsCtrl = require('./controllers/reviews')


const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(express.static('public'))
app.use(connectLiveReload());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//Mount Routes
app.get('/', function (req, res) {
    db.Workout.find({ isFeatured: true })
        .then(workouts => {
            res.render('home', {
                workouts: workouts
            })
        })
});

app.get('/seed', function (req, res) {
    db.Workout.deleteMany({})
        .then(removedWorkouts => {
            console.log(`Removed ${removedWorkouts.deletedCount} lifts`)
            db.Workout.insertMany(db.seedWorkouts)
                .then(addedWorkouts => {
                    console.log(`Added ${addedWorkouts.length} workouts!`)
                    res.json(addedWorkouts)
                })
        })
});

app.get('/', function (req, res) {
    db.Workout.find({ isFeatured: true })
        .then(workouts => {
            res.render('home', {
                workouts: workouts
            })
        })
});

app.get('/about', function (req, res) {
    res.render('about')
});

app.use('/workouts', workoutsCtrl)
app.use('/reviews', revsCtrl)

//404
app.get('*', function (req, res) {
    res.render('404')
});

app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
