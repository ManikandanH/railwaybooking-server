const { bookingSchemaInterface } = require("../../../DataBase/BookingSchema");
const { BookingUser } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");
const validation = require("../../../Validation");

const historyTicketService = (payload, callback) => {
    validation(bookingSchemaInterface, ["user_ID"], payload, (error, result) => {
        if (error) {
            callback(null, error, 422);
        } else if (result.message === "SUCCESS") {
            dbOperations(BookingUser, (bookingData) => {
                bookingData.findOne({ user_ID: payload.user_ID },
                    null,
                    (error, resultBookingData) => {
                        if (error) {
                            callback(error, null, 500);
                        } else {
                            if (resultBookingData) {
                                callback(null, resultBookingData, 200);
                            } else {
                                callback(null, { error: "no Bookings yet" }, 200);
                            }
                        }
                    }
                );
            });
        }
    });
};

module.exports = historyTicketService;