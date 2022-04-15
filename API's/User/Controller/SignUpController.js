const userSignUpService = require("../Services/SignUpService");

const userSignUpController = (req, res) =>
    userSignUpService(req.body, (error, result, statusCode = null) => {
        if (error) {
            res.status(statusCode).send("Error While Signing UP");
        } else if (result) {
            if (result && result.message === "Already Exists") {
                res.status(statusCode).send(result);
            } else {
                res.status(statusCode).send(result);
            }
        }
    });

module.exports = userSignUpController;