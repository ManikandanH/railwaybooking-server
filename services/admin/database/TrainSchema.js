const mongoose = require("mongoose")

const Schema = mongoose.Schema

const trainSchemaInterface = {
	_id: {
		type: Number,
		required: false,
	},
	Train_Name: {
		type: String,
		required: true,
	},
	Price: {
		type: Number,
		required: true,
	},
	Train_Source: {
		Train_Source_station: {
			type: String,
			required: true,
		},
		Train_Source_Time: {
			type: String,
			required: true,
		},
	},
	Train_Destination: {
		Train_Destination_station: {
			type: String,
			required: true,
		},
		Train_Destination_Time: {
			type: String,
			required: true,
		},
	},
	Train_Seats: {
		type: Number,
		required: true,
	},
}

const trainSchema = new Schema(trainSchemaInterface)

module.exports = {
	trainDBSchema: mongoose.model("Trains", trainSchema),
	trainSchemaInterface,
}
