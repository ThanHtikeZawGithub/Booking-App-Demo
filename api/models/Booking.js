const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'Place',
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    checkIn: {
        type:Date,
        required: true,
    },
    checkOut: {
        type:Date,
        required: true,
    },
    numOfDay: {
        type:Number
    },
    name: {
        type:String,
        required: true,
    },
    phone: {
        type:String,
        required: true,
    },
    price:{
        type:Number
    }
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;