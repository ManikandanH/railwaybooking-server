const userSignInService = require("../Services/SignInService")

const userSignInController = (req, res) =>
	userSignInService(req.body, (error, result, statusCode = null) => {
		if (error) {
			res.status(statusCode).send(error)
		} else if (result) {
			if (result && result.message !== "SUCCESS") {
				res.status(statusCode).send(result)
			} else if (result && result.message === "SUCCESS") {
				res.status(statusCode).send(result)
			} else {
				res.send(result)
			}
		}
	})

module.exports = userSignInController
