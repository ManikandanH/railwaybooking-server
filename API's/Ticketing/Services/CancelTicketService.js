const { bookingSchemaInterface } = require("../../../DataBase/BookingSchema");
const { BookingUser } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");
const validation = require("../../../Validation");

const cancelTicketService = (payload, callback) => {
    validation(bookingSchemaInterface, ["user_ID"], payload, (error, result) => {
        if (error) {
            callback(null, error, 422);
        } else if (result.message === "SUCCESS") {
            dbOperations(BookingUser, (bookingData) => {
                bookingData
                    .find({ user_ID: payload.user_ID })
                    .toArray((error, bookingHistory) => {
                        if (error) {
                            callback(error, null, 500);
                        } else if (bookingHistory.length === 0) {
                            callback(error, { error: "Booking doesn't exists" }, 404);
                        } else if (bookingHistory.length > 0) {
                            bookingData
                                .findOneAndDelete({ user_ID: payload.user_ID })
                                .then((deletedData) => {
                                    callback(null, { message: "Successfully deleted" }, 200);
                                })
                                .catch((error) => {
                                    callback(error, null, 500);
                                });
                        }
                    });
            });
        }
    });
};

module.exports = cancelTicketService;