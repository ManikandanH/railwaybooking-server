const mongoose = require("mongoose")

const Schema = mongoose.Schema

const adminSchemaInterface = {
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	acceptedFlag: {
		type: Boolean,
		required: false,
	},
}
const AdminSchema = new Schema(adminSchemaInterface)

module.exports = {
	adminDBSchema: mongoose.model("Admin", AdminSchema),
	adminSchemaInterface,
}
