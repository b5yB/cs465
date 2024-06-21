var express = require('express');
var router = express.Router();


const {expressJwt: jwt} = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const authController = require('../controllers.authentication')
const tripsController = require('../controllers/trips');

// user login
router
    .route('/login')
    .post(authController.login);

// create new user
router
    .route('/register')
    .post(authController.register);


router
    .route('/trips')
    // get all trips
    .get(tripsController.tripsList)
    // create a trip
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    // get trip by code
    .get(tripsController.tripsFindByCode)
    // updates a trip
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;
