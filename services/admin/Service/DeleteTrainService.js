const { Trains } = require("../database")
const { trainSchemaInterface } = require("../database/TrainSchema")
const dbOperations = require("../database/mongoose")
const validation = require("../helpers/validation")

const deleteTrainService = (payload, callback) => {
	validation(trainSchemaInterface, ["Train_Name"], payload, (error, result) => {
		if (error) {
			callback(null, error, 422)
		} else if (result.message === "SUCCESS") {
			dbOperations(Trains, (trainData) => {
				trainData.findOneAndDelete(
					{ Train_Name: payload.Train_Name },
					null,
					(error, resultedData) => {
						if (error) {
							callback(error, null, 500)
						} else if (resultedData && resultedData.ok && resultedData.value) {
							callback(null, { message: "Successfully Deleted" }, 200)
						} else if (resultedData.value === null) {
							callback(null, { error: "No Trains found" }, 404)
						}
					}
				)
			})
		}
	})
}

module.exports = deleteTrainService
