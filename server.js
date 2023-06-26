/* Require modules
--------------------------------------------------------------- */
require('dotenv').config()
const path = require('path');
const express = require('express');
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");


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


/* Mount routes
--------------------------------------------------------------- */
app.get('/', function (req, res) {
    res.send('FLO Motion Fitness')
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

// This tells our app to look at the `controllers/workouts.js` file 
// to handle all routes that begin with `localhost:3000/workouts`
app.use('/workouts', workoutsCtrl)

/* Tell the app to listen on the specified port
--------------------------------------------------------------- */
app.listen(process.env.PORT, function () {
    console.log('Express is listening to port', process.env.PORT);
});
