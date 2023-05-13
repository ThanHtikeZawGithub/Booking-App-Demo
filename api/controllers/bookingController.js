const Booking = require('../models/Booking.js');
const dbConfig = require('../config/dbConfig');

// Create a new booking
const createBooking = async (req, res) => {
  dbConfig();
  const { place, checkIn, checkOut, numOfGuests, name, phone, price } = req.body;
  const user = req.user.id; // Assuming the authenticated user ID is stored in req.user.id

  Booking.create({
    place,
    checkIn,
    checkOut,
    numOfGuests,
    name,
    phone,
    price,
    user,
  })
    .then((booking) => {
      res.json(booking);
    })
    .catch((err) => {
      throw err;
    });
};

// Get bookings for a user
const getUserBookings = async (req, res) => {
  dbConfig();
  const user = req.user.id; // Assuming the authenticated user ID is stored in req.user.id

  try {
    const bookings = await Booking.find({ user }).populate('place');
    res.json(bookings);
  } catch (err) {
    throw err;
  }
};
module.exports = {
    createBooking,
    getUserBookings
};