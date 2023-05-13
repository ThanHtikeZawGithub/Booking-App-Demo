const express = require('express');
const {createBooking, getUserBookings} = require('../controllers/bookingController.js');

const router = express.Router();

// Create a new booking
router.post('/', createBooking);

// Get bookings for a user
router.get('/', getUserBookings);

module.exports = router;