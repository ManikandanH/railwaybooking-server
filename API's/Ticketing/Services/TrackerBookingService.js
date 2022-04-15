// const dbOperations = require("../../../DataBase/mongoose");
// const {
//     BookingTracker,
//     Trains,
// } = require("../../../DataBase/CollectionDetail");
// const {
//     bookingTrackerDBSchema,
// } = require("../../../DataBase/BookingDailyTrackerSchema");
// const ModelMapper = require("../../../helpers/PayloadModelHandler");

// const bookingTrackerSaveEditFun = () => {
//     return {
//         save: (trackerData, trackerSchema, callback, savedResultFromBookingAPI) => {
//             trackerData.save(trackerSchema, null, (error, savedResult) => {
//                 if (error) {
//                     callback(error, null, 500);
//                 } else if (savedResult) {
//                     if (savedResultFromBookingAPI) {
//                         callback(null, { message: "Sucessfully Booked" }, 201);
//                     }
//                 } else {
//                     callback({ error: "Not Saved due to server issue" }, null, 500);
//                 }
//             });
//         },
//         edit: (trackerData, trackerSchema, callback, savedResultFromBookingAPI) => {
//             trackerData
//                 .find({
//                     [trackerSchema.Train_Name]: Object,
//                 })
//                 .toArray((error, trackertResult) => {
//                     if (error) {
//                         callback(error, null, 500);
//                     } else if (trackertResult.length > 0) {
//                         trackerData.findOneAndUpdate({
//                                 [trackerSchema.Train_Name]: Object,
//                             }, {
//                                 $set: {
//                                     [trackerSchema.Train_Name]: {
//                                         Train_Remaining_Seats: trackerSchema.Train_Remaining_Seats,
//                                     },
//                                 },
//                             },
//                             null,
//                             (error, result) => {
//                                 if (error) {
//                                     callback(error, null, 500);
//                                 } else if (result && savedResultFromBookingAPI) {
//                                     callback(null, { message: "Sucessfully Updated" }, 201);
//                                 }
//                             }
//                         );
//                     }
//                 });
//         },
//     };
// };

// const trackerBookingService = (payload, savedDbResult, callback) => {
//     const { Booking_Details } = payload;
//     dbOperations(BookingTracker, (bookingTrackerData) => {
//         bookingTrackerData
//             .find({
//                 [Booking_Details[0].Train_Name]: Object,
//             })
//             .toArray((error, trackerResult) => {
//                 if (trackerResult.length === 0) {
//                     dbOperations(Trains, (trainData) => {
//                         trainData
//                             .find({ Train_Name: Booking_Details[0].Train_Name })
//                             .toArray((error, trainData) => {
//                                 if (trainData.length > 0) {
//                                     const remainingSeats =
//                                         trainData[0].Train_Seats - Booking_Details[0].Total_Seats;
//                                     const customPayload = {
//                                         [Booking_Details[0].Train_Name]: {
//                                             Train_Remaining_Seats: remainingSeats,
//                                         },
//                                     };
//                                     bookingTrackerSaveEditFun().save(
//                                         bookingTrackerData,
//                                         customPayload,
//                                         callback,
//                                         savedDbResult
//                                     );
//                                 }
//                             });
//                     });
//                 } else if (trackerResult.length > 0) {
//                     if (
//                         savedDbResult.lastErrorObject &&
//                         savedDbResult.lastErrorObject.updatedExisting
//                     ) {
//                         dbOperations(Trains, (trainData) => {
//                             trainData
//                                 .find({ Train_Name: Booking_Details[0].Train_Name })
//                                 .toArray((error, trainData) => {
//                                     if (trainData.length > 0) {
//                                         const remainingSeats =
//                                             trainData[0].Train_Seats - Booking_Details[0].Total_Seats;
//                                         const customPayload = {
//                                             Train_Name: Booking_Details[0].Train_Name,
//                                             Train_Remaining_Seats: remainingSeats,
//                                         };
//                                         bookingTrackerSaveEditFun().edit(
//                                             bookingTrackerData,
//                                             customPayload,
//                                             () =>
//                                             callback(
//                                                 null, { message: "Successfully Updated" },
//                                                 201
//                                             ),
//                                             savedDbResult
//                                         );
//                                     }
//                                 });
//                         });
//                     } else {
//                         const remainingSeats =
//                             trackerResult[0][Booking_Details[0].Train_Name]
//                             .Train_Remaining_Seats - Booking_Details[0].Total_Seats;
//                         const customPayload = {
//                             Train_Name: Booking_Details[0].Train_Name,
//                             Train_Remaining_Seats: remainingSeats,
//                         };
//                         bookingTrackerSaveEditFun().edit(
//                             bookingTrackerData,
//                             customPayload,
//                             () => callback(null, { message: "Successfully Created" }, 201),
//                             savedDbResult
//                         );
//                     }
//                 }
//             });
//     });
// };

// module.exports = trackerBookingService;