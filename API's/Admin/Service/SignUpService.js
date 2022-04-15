const bcrypt = require("bcrypt-nodejs");
const { Admin } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");
const { AdminPrivateKey } = require("../../../Keys");
const ModelMapper = require("../../../helpers/PayloadModelHandler");

//Schema
const {
    adminDBSchema,
    adminSchemaInterface,
} = require("../../../DataBase/AdminSchema");

//validation
const validation = require("../../../Validation");

const adminSignUpService = (payload, callback) =>
    validation(adminSchemaInterface, null, payload, (error, result) => {
        if (error) {
            callback(null, error.error, 422);
        } else if (result.message === "SUCCESS") {
            const adminCredentials = new adminDBSchema();
            adminCredentials.userName = payload.userName;
            adminCredentials.password = bcrypt.hashSync(payload.password);
            adminCredentials.acceptedFlag = false;
            dbOperations(Admin, (adminData) => {
                adminData
                    .find({ userName: adminCredentials.userName })
                    .toArray((error, findResult) => {
                        if (error) {
                            callback(error, null, 500);
                        } else if (findResult.length === 0) {
                            adminData.save(adminCredentials, null, (error, saveResult) => {
                                if (error) {
                                    callback(error, null, 500);
                                } else if (saveResult) {
                                    callback(
                                        null, { message: "successfully created wait for the approval" },
                                        201
                                    );
                                }
                            });
                        } else if (findResult.length > 0) {
                            callback(null, { message: "Already Exists" }, 409);
                        }
                    });
            });
        }
    });

module.exports = adminSignUpService;