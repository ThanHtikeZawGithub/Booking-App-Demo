const Place = require('../models/Place.js');
const dbConfig = require('../config/dbConfig');
const jwt = require('jsonwebtoken');
const jwtSecret = 'sdffafdsfsdgdsgegfegeg';

// Create a new place
const createPlace = async (req, res) => {
  dbConfig();
  const { token } = req.cookies;
  const {
    title,
    address,
    photos,
    description,
    options,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;

    const placeInfo = await Place.create({
      owner: userData.id,
      title,
      address,
      photos,
      description,
      options,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    });

    res.json(placeInfo);
  });
};

// Get all places
const getAllPlaces = async (req, res) => {
  dbConfig();
  res.json(await Place.find());
};

// Get a single place by ID
getPlaceById = async (req, res) => {
  dbConfig();
  const { id } = req.params;
  res.json(await Place.findById(id));
};

// Get places owned by a user
const getUserPlaces = async (req, res) => {
  dbConfig();
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
};

// Update a place
const updatePlace = async (req, res) => {
  dbConfig();
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photos,
    description,
    options,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeData = await Place.findById(id);
    if (userData.id === placeData.owner.toString()) {
      placeData.set({
        title,
        address,
        photos,
        description,
        options,
        extraInfo,
        checkIn,
        checkOut,
        maxGuest,
        price,
      });
      await placeData.save();
      res.json('saved');
    }
  });
};

// Delete a place
const deletePlace = async (req, res) => {
  dbConfig();
  const { id } = req.params;
  await Place.findByIdAndRemove(id);
  res.json('Place deleted successfully');
};


module.exports = {
    createPlace,
    getAllPlaces,
    getPlaceById,
    getUserPlaces,
    updatePlace,
    deletePlace
}