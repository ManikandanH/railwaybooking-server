const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingTrackerInterface = {
    Train_Name: {
        Train_Remaining_Seats: {
            type: Number,
            required: true,
            default: 0,
        },
        Train_Booked_Seats: {
            type: Number,
            required: true,
            default: 0,
        },
    },
};

const bookingTrackerSchema = new Schema(bookingTrackerInterface);

module.exports = {
    bookingTrackerDBSchema: mongoose.model(
        "BookingTracker",
        bookingTrackerSchema
    ),
    bookingTrackerInterface,
};