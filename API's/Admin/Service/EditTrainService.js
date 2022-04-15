const { Trains } = require("../../../DataBase/CollectionDetail")
const { trainSchemaInterface } = require("../../../DataBase/TrainSchema")
const dbOperations = require("../../../DataBase/mongoose")
const validation = require("../../../Validation")

const editTrainService = (payload, callback) => {
	validation(trainSchemaInterface, null, payload, (error, result) => {
		if (error) {
			callback(null, error, 422)
		} else if (result.message === "SUCCESS") {
			dbOperations(Trains, (trainData) => {
				trainData.findOneAndUpdate(
					{ Train_Name: payload.Train_Name },
					{
						$set: {
							Train_Name: payload.Train_Name,
							Train_Source: payload.Train_Source,
							Train_Destination: payload.Train_Destination,
							Train_Seats: payload.Train_Seats,
						},
					},
					null,
					(error, resultedData) => {
						if (error) {
							callback(error, null, 500)
						} else if (resultedData && resultedData.ok && resultedData.value) {
							callback(null, { message: "Successfully updated" }, 200)
						} else if (resultedData.value === null) {
							callback(null, { error: "No Trains found" }, 404)
						}
					}
				)
			})
		}
	})
}

module.exports = editTrainService
