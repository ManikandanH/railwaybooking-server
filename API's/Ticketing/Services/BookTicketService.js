const {
    bookingSchemaInterface,
    bookingDBSchema,
} = require("../../../DataBase/BookingSchema");
const { BookingUser, Trains } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");
const ModelMapper = require("../../../helpers/PayloadModelHandler");
const validation = require("../../../Validation");
const trainValidation = require("../../../Validation/BookingTrainValidation");

const bookingSaveEditFun = () => {
    return {
        save: (bookingData, bookingSchema, responseCallback) =>
            bookingData.save(bookingSchema, null, (error, savedResult) => {
                if (error) {
                    responseCallback(error, null, 500);
                } else if (savedResult) {
                    responseCallback(null, { message: "successfully Booked" }, 201);
                } else {
                    responseCallback({ error: "Not Saved due to server issue" },
                        null,
                        500
                    );
                }
            }),
    };
};

const bookTicketService = (payload, callback) => {
    validation(bookingSchemaInterface, null, payload, (error, result) => {
        if (error) {
            callback(null, error, 422);
        } else if (result.message === "SUCCESS") {
            dbOperations(BookingUser, (bookingData) => {
                bookingData
                    .find({ user_ID: payload.user_ID })
                    .toArray((error, findBookingResult) => {
                        if (error) {
                            callback(error, null, 500);
                        } else if (findBookingResult.length === 0) {
                            const bookingObj = ModelMapper(payload, bookingDBSchema);
                            trainValidation(payload, Trains, callback, () =>
                                bookingSaveEditFun().save(bookingData, bookingObj, callback)
                            );
                        } else {
                            callback(null, { error: "Already Booked" }, 404);
                        }
                    });
            });
        }
    });
};

module.exports = bookTicketService;