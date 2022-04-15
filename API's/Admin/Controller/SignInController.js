const adminSignInService = require("../Service/SignInService")

const adminSignInController = (req, res) =>
	adminSignInService(req.body, (error, result, statusCode = null) => {
		if (error) {
			res.status(statusCode).send("Error in logging")
		}
		if (result) {
			if (result && result.message === "Wrong Credentials") {
				res.status(statusCode).send("UnAuthorized")
			} else if (result && result.message === "Still Pending") {
				res.status(statusCode).send("Your Admin Access is still Pending")
			} else {
				res.send(statusCode, result)
			}
		}
	})

module.exports = adminSignInController
