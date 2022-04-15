const { Trains } = require("../../../DataBase/CollectionDetail")
const {
	trainDBSchema,
	trainSchemaInterface,
} = require("../../../DataBase/TrainSchema")
const dbOperations = require("../../../DataBase/mongoose")
const validation = require("../../../Validation")

const trainSave = (trainData, trainSchema, callback) => {
	trainData.save(trainSchema, null, (error, savedResult) => {
		if (error) {
			callback(error, null, 500)
		} else if (savedResult) {
			callback(null, savedResult.ops, 201)
		} else {
			callback({ error: "Not Saved due to server issue" }, null, 500)
		}
	})
}

const addTrainService = (payload, callback) => {
	validation(trainSchemaInterface, null, payload, (error, result) => {
		if (error) {
			callback(null, error, 422)
		} else if (result.message === "SUCCESS") {
			const trainSchema = new trainDBSchema()
			trainSchema.Train_Name = payload.Train_Name
			trainSchema.Train_Source = payload.Train_Source
			trainSchema.Train_Destination = payload.Train_Destination
			trainSchema.Train_Seats = payload.Train_Seats

			dbOperations(Trains, (TrainData) => {
				TrainData.find({ Train_Name: payload.Train_Name }).toArray(
					(error, trainNameResult) => {
						if (error) {
							callback(error, null, 500)
						}
						if (trainNameResult.length === 0) {
							TrainData.find({
								"Train_Source.Train_Source_station":
									payload.Train_Source.Train_Source_station,
								"Train_Destination.Train_Destination_station":
									payload.Train_Destination.Train_Destination_station,
							}).toArray((error, trainSourceResult) => {
								if (error) {
									callback(error, null, 500)
								}
								if (trainSourceResult.length === 0) {
									trainSave(TrainData, trainSchema, callback)
								} else if (trainSourceResult.length > 0) {
									TrainData.find({
										"Train_Source.Train_Source_Time":
											payload.Train_Source.Train_Source_Time,
										"Train_Destination.Train_Destination_Time":
											payload.Train_Destination.Train_Destination_Time,
									}).toArray((error, trainTimeResult) => {
										if (error) {
											callback(error, null, 500)
										}
										if (trainTimeResult.length === 0) {
											trainSave(TrainData, trainSchema, callback)
										} else if (trainTimeResult.length > 0) {
											callback(
												null,
												{ error: "Give different timing for the train" },
												409
											)
										}
									})
								}
							})
						} else if (trainNameResult.length > 0) {
							callback(null, { error: "Train Name already Exists" }, 409)
						} else {
							callback(null, null, 500)
						}
					}
				)
			})
		} else {
			callback(null, { error: "UnProcessible Error" }, 422)
		}
	})
}

module.exports = addTrainService
