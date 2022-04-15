const express = require("express");
const router = express.Router();

//Controller
const userSignInController = require("../Controller/SignInController");
const userSignUpController = require("../Controller/SignUpController");

//API's
router.get("/", (req, res) => {
    res.send("Hi Welcome to User API");
});
router.post("/sign-in", userSignInController);
router.post("/sign-up", userSignUpController);

module.exports = router;