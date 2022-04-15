const dbOperations = require("../DataBase/mongoose");

const trainValidation = (
    payload,
    collectionName,
    callback,
    customFunCallback
) => {
    dbOperations(collectionName, (trainData) => {
        trainData
            .find({
                Train_Name: payload.Booking_Details[0].Train_Name,
                "Train_Source.Train_Source_station": payload.Booking_Details[0].Train_Source.Train_Source_station,
                "Train_Destination.Train_Destination_station": payload.Booking_Details[0].Train_Destination
                    .Train_Destination_station,
                "Train_Source.Train_Source_Time": payload.Booking_Details[0].Train_Source.Train_Source_Time,
                "Train_Destination.Train_Destination_Time": payload.Booking_Details[0].Train_Destination.Train_Destination_Time,
            })
            .toArray((error, trainResults) => {
                if (error) {
                    callback(error, null, 500);
                } else if (trainResults.length !== 0) {
                    customFunCallback();
                } else if (trainResults.length === 0) {
                    callback(null, { error: "Train not found" }, 404);
                }
            });
    });
};

module.exports = trainValidation;