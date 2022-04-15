const mongoose = require("mongoose")

const Schema = mongoose.Schema

const bookingSchemaInterface = {
    user_ID: {
        type: String,
        required: true,
    },
    Booking_Details: [{
        Total_Seats: {
            type: Number,
            required: true,
        },
        Total_Cost: {
            type: Number,
            required: false,
        },
        Passengers: [{
            name: {
                type: String,
                required: true,
            },
            age: {
                type: Number,
                required: true,
            },
            gender: {
                type: String,
                required: true,
            },
        }, ],
        Train_Name: {
            type: String,
            required: true,
        },
        Train_Source: {
            Train_Source_station: {
                type: String,
                required: true,
            },
            Train_Source_Time: {
                type: String,
                required: true,
            },
        },
        Train_Destination: {
            Train_Destination_station: {
                type: String,
                required: true,
            },
            Train_Destination_Time: {
                type: String,
                required: true,
            },
        },
    }, ],
}

const bookingSchema = new Schema(bookingSchemaInterface)

module.exports = {
    bookingDBSchema: mongoose.model("BookingUser", bookingSchema),
    bookingSchemaInterface,
}