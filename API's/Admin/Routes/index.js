const express = require("express");
const router = express.Router();

//Controllers
const adminSignInController = require("../Controller/SignInController");
const adminSignUpController = require("../Controller/SignUpController");
const adminTrainAddController = require("../Controller/AddTrainController");
const adminTrainEditController = require("../Controller/EditTrainController");
const adminTrainDeleteController = require("../Controller/DeleteTrainController");
const adminAcceptUserController = require("../Controller/AcceptUserController");

//Token verification Method
const verifyToken = require("../../../Validation/verifyToken");

//PrivateKey for token
const { AdminPrivateKey } = require("../../../Keys");

//API's
router.get("/", (req, res) => {
    res.send("You are in Admin Service");
});
router.post("/sign-in", adminSignInController);
router.post("/sign-up", adminSignUpController);
router.post(
    "/add-train",
    (req, res, next) => verifyToken(req, res, next, AdminPrivateKey),
    adminTrainAddController
);
router.put(
    "/edit-train",
    (req, res, next) => verifyToken(req, res, next, AdminPrivateKey),
    adminTrainEditController
);
router.delete(
    "/delete-train",
    (req, res, next) => verifyToken(req, res, next, AdminPrivateKey),
    adminTrainDeleteController
);
router.post(
    "/accept-admin",
    (req, res, next) => verifyToken(req, res, next, AdminPrivateKey),
    adminAcceptUserController
);

module.exports = router;