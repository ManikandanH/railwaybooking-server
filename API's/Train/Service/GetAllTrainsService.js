const { Trains } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");

const getAllTrainService = (callback) => {
    dbOperations(Trains, (trainData) => {
        trainData.find({}).toArray((error, resultData) => {
            if (error) {
                callback(error, null, 500);
            } else if (resultData.length === 0) {
                callback(null, { message: "No Trains" }, 200);
            } else if (resultData.length > 0) {
                callback(null, resultData, 200);
            }
        });
    });
};

module.exports = getAllTrainService;