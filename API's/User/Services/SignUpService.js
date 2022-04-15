const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { Users } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");
const { UserPrivateKey } = require("../../../Keys");

const {
    userDBSchema,
    userSchemaInterface,
} = require("../../../DataBase/UserSchema");

const validation = require("../../../Validation");

const userSignUpService = (payload, callback) =>
    validation(userSchemaInterface, null, payload, (error, result) => {
        if (error) {
            callback(null, error.error, 422);
        } else if (result.message === "SUCCESS") {
            const userCredentials = new userDBSchema();
            userCredentials.userName = payload.userName;
            userCredentials.password = bcrypt.hashSync(payload.password);
            userCredentials.Age = payload.Age;
            userCredentials.firstName = payload.firstName;
            userCredentials.secondName = payload.secondName;

            dbOperations(Users, (userData) => {
                userData
                    .find({ userName: userCredentials.userName })
                    .toArray((error, findResult) => {
                        if (error) {
                            callback(error, null, 500);
                        } else if (findResult.length === 0) {
                            userData.save(userCredentials, null, (error, saveResult) => {
                                if (error) {
                                    callback(error, null, 500);
                                } else if (saveResult) {
                                    jwt.sign({
                                            userName: userCredentials.userName,
                                            password: userCredentials.password,
                                        },
                                        UserPrivateKey,
                                        (error, token) => {
                                            if (error) {
                                                callback(error, null, 500);
                                            } else {
                                                userData
                                                    .find({
                                                        _id: saveResult && saveResult.result.upserted[0]._id,
                                                    })
                                                    .toArray((error, resultUserData) => {
                                                        if (error) {
                                                            callback(error, null, 500);
                                                        } else {
                                                            const userData = {
                                                                userName: resultUserData[0].userName,
                                                                age: resultUserData[0].Age,
                                                                gender: resultUserData[0].Gender,
                                                                firstName: resultUserData[0].firstName,
                                                                secondName: resultUserData[0].secondName,
                                                                user_ID: resultUserData[0]._id,
                                                            };
                                                            callback(
                                                                null, {
                                                                    userData,
                                                                    token,
                                                                },
                                                                200
                                                            );
                                                        }
                                                    });
                                            }
                                        }
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

module.exports = userSignUpService;