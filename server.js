/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const methodOverride = require('method-override');



/* Require the db connection, models, and seed data
--------------------------------------------------------------- */
const db = require('./models');


/* Create the Express app
--------------------------------------------------------------- */
const app = express();

/* Require the routes in the controllers folder
--------------------------------------------------------------- */
const workoutsCtrl = require('./controllers/workouts')


/* Configure the app to refresh the browser when nodemon restarts
--------------------------------------------------------------- */
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
    // wait for nodemon to fully restart before refreshing the page
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});


/* Configure the app (app.set)
--------------------------------------------------------------- */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


/* Middleware (app.use)
--------------------------------------------------------------- */
app.use(express.static('public'))
app.use(connectLiveReload());
app.use(express.urlencoded({ extended: true }));
// Allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride('_method'));


/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    db.Workout.find({ isFeatured: true })
        .then(workouts => {
            res.render('home', {
                workouts: workouts
            })
        })
});

app.get('/seed', function (req, res) {
    // Remove any existing workouts
    db.Workout.deleteMany({})
        .then(removedWorkouts => {
            console.log(`Removed ${removedWorkouts.deletedCount} lifts`)
            // Seed the workouts collection with the seed data
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
    res.send('You\'ve hit the about route')
});

// This tells our app to look at the `controllers/workouts.js` file 
// to handle all routes that begin with `localhost:3000/workouts`
app.use('/workouts', workoutsCtrl)

// The "catch-all" route: Runs for any other URL that doesn't match the above routes
app.get('*', function (req, res) {
    res.send('404 Error: Page Not Found')
});

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
