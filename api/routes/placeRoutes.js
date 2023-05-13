const express = require('express');
const {
        createPlace,
        getAllPlaces,
        getPlaceById,
        getUserPlaces,
        updatePlace,
        deletePlace
        } = require('../controllers/placeController.js');
const authenticateUser = require('../middleware/authMiddleware')
const router = express.Router();

// Create a new place
router.post('/places/', createPlace);

// Get all places
router.get('/places/', getAllPlaces);

// Get a single place by ID
router.get('/places/:id', getPlaceById);

// Get places owned by a user
router.get('/user-places',authenticateUser, getUserPlaces);

// Update a place
router.put('/places/', updatePlace);

// Delete a place
router.delete('/places/:id', deletePlace);

module.exports = router;