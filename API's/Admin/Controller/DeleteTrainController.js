const deleteTrainService = require("../Service/DeleteTrainService")

const deleteTrainController = (req, res) =>
	deleteTrainService(req.body, (error, result, statusCode = null) => {
		if (error) {
			res.status(statusCode).send("Internal Server Error")
		}
		if (result) {
			res.status(statusCode).send(result)
		}
	})

module.exports = deleteTrainController
