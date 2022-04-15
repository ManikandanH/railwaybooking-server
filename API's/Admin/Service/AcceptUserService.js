const { Admin } = require("../../../DataBase/CollectionDetail")
const dbOperations = require("../../../DataBase/mongoose")

const { adminSchemaInterface } = require("../../../DataBase/AdminSchema")

const validation = require("../../../Validation")

const acceptUserService = (payload, callback) => {
	validation(adminSchemaInterface, ["userName"], payload, (error, result) => {
		if (error) {
			callback(null, error, 422)
		} else if (result.message === "SUCCESS") {
			dbOperations(Admin, (adminData) => {
				adminData.findOneAndUpdate(
					{ userName: payload.userName },
					{
						$set: {
							acceptedUser: true,
						},
                    },
                    null,
                    (error, resultData) => {
                        if (error) {
							callback(error, null, 500)
						} else if (resultData && resultData.ok && resultData.value) {
							callback(null, { message: "Successfully Approved" }, 200)
						} else if (resultData.value === null) {
							callback(null, { error: "No Admin's found in the given name" }, 404)
						}
                    }
				)
			})
		}
	})
}

module.exports = acceptUserService
