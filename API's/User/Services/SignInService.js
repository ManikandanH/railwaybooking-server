const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { Users } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");

const validation = require("../../../Validation");
const { userSchemaInterface } = require("../../../DataBase/UserSchema");

const { UserPrivateKey } = require("../../../Keys");

const userSignInService = (payload, callback) => {
    validation(
        userSchemaInterface, ["userName", "password"],
        payload,
        (error, result) => {
            if (error) {
                callback(null, error.error, 422);
            } else if (result.message === "SUCCESS") {
                dbOperations(Users, (userData) => {
                    userData
                        .find({ userName: payload.userName })
                        .toArray((error, userResult) => {
                            if (error) {
                                callback(error, null, 500);
                            } else if (userResult.length === 0) {
                                callback(null, { message: "Wrong UserName" }, 401);
                            } else {
                                bcrypt.compare(
                                    payload.password,
                                    userResult[0].password,
                                    (error, passwordMatchFlag) => {
                                        if (error) {
                                            callback(error, null, 500);
                                        } else if (!passwordMatchFlag) {
                                            callback(null, { message: "Wrong Password" }, 401);
                                        } else if (passwordMatchFlag) {
                                            jwt.sign({
                                                    userName: userResult[0].userName,
                                                    password: userResult[0].password,
                                                },
                                                UserPrivateKey,
                                                (error, token) => {
                                                    if (error) {
                                                        callback(error, null, 500);
                                                    } else {
                                                        const userData = {
                                                            userName: userResult[0].userName,
                                                            age: userResult[0].Age,
                                                            gender: userResult[0].Gender,
                                                            firstName: userResult[0].firstName,
                                                            secondName: userResult[0].secondName,
                                                            user_ID: userResult[0]._id,
                                                        };
                                                        callback(null, { userData, token }, 200);
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        });
                });
            }
        }
    );
};

module.exports = userSignInService;