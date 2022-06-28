const acceptUserService = require("../Service/AcceptUserService");

const acceptUserController = (req, res) =>
    acceptUserService(req.body, (error, result, statusCode = null) => {
        if (error) {
            res.status(statusCode).send("Internal Server Error");
        }
        if (result) {
            res.status(statusCode).send(result);
        }
    });

module.exports = acceptUserController;