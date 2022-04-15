const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchemaInterface = {
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	Gender: {
		type: String,
		required: true,
	},
	Age: {
		type: Number,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	secondName: {
		type: String,
		required: true,
	},
}
const userSchema = new Schema(userSchemaInterface)

module.exports = {
	userDBSchema: mongoose.model("User", userSchema),
	userSchemaInterface,
}
