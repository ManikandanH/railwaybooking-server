const adminSignUpService = require("../Service/SignUpService");

const adminSignUpController = (req, res) =>
    adminSignUpService(req.body, (error, result, statusCode = null) => {
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

module.exports = adminSignUpController;