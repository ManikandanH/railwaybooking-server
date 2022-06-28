const addTrainService = require("../Service/AddTrainService")

const addTrainController = (req, res) =>
	addTrainService(req.body, (error, result, statusCode = null) => {
		if (error) {
			res.status(statusCode).send("Internal Server Error")
		}
		if (result) {
			res.status(statusCode).send(result)
		}	
	})

module.exports = addTrainController
