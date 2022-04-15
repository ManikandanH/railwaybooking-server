const getAllTrainService = require("../Service/GetAllTrainsService");

const getAllTrainController = (req, res) =>
    getAllTrainService((error, result, statusCode = null) => {
        if (error) {
            res.status(statusCode).send("Internal Server Error");
        }
        if (result) {
            res.status(statusCode).send(result);
        }
    });

module.exports = getAllTrainController;