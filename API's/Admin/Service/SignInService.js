const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const { Admin } = require("../../../DataBase/CollectionDetail");
const dbOperations = require("../../../DataBase/mongoose");

const { adminSchemaInterface } = require("../../../DataBase/AdminSchema");
const { AdminPrivateKey } = require("../../../Keys");

const validation = require("../../../Validation");

const adminSignInService = (payload, callback) => {
  validation(
    adminSchemaInterface,
    ["userName", "password"],
    payload,
    (error, result) => {
      if (error) {
        callback(null, error.error, 422);
      } else if (result.message === "SUCCESS") {
        dbOperations(Admin, (adminData) => {
          adminData
            .find({ userName: payload.userName })
            .toArray((error, userResult) => {
              if (error) {
                callback(error, null, 500);
              } else if (userResult.length === 0) {
                callback(null, { message: "Wrong Credentials" }, 401);
              } else {
                bcrypt.compare(
                  payload.password,
                  userResult[0].password,
                  (error, passwordMatchFlag) => {
                    if (error) {
                      callback(error, null, 500);
                    } else if (!userResult[0].acceptedFlag) {
                      return callback(null, { message: "Still Pending" }, 401);
                    } else if (!passwordMatchFlag) {
                      callback(null, { message: "Wrong Credentials" }, 401);
                    } else if (passwordMatchFlag) {
                      jwt.sign(
                        {
                          userName: userResult[0].userName,
                          password: userResult[0].password,
                        },
                        AdminPrivateKey,
                        (error, token) => {
                          if (error) {
                            callback(error, null, 500);
                          } else {
                            callback(
                              null,
                              { userName: userResult[0].userName, token },
                              200
                            );
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

module.exports = adminSignInService;
