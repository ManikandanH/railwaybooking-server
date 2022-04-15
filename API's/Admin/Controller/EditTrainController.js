const editTrainService = require("../Service/EditTrainService")

const editTrainController = (req, res) =>
	editTrainService(req.body, (error, result, statusCode = null) => {
		if (error) {
			res.status(statusCode).send("Internal Server Error")
		}
		if (result) {
			res.status(statusCode).send(result)
		}
	})

module.exports = editTrainController
