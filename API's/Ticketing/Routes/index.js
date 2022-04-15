const express = require("express");
const router = express.Router();

//Controller
const bookTicketController = require("../Controller/BookTicketController");
const cancelTicketController = require("../Controller/CancelTicketController");
const bookingHistoryController = require("../Controller/HistoryTicketController");

//Token Verification Method
const verifyToken = require("../../../Validation/verifyToken");

//Private Key for token
const { UserPrivateKey } = require("../../../Keys");

//API's
router.get("/", (req, res) => {
    res.send("Hi Welcome to Ticketing API");
});

router.post(
    "/book-ticket",
    (req, res, next) => verifyToken(req, res, next, UserPrivateKey),
    bookTicketController
);
router.delete(
    "/cancel-ticket",
    (req, res, next) => verifyToken(req, res, next, UserPrivateKey),
    cancelTicketController
);
router.post(
    "/booking-history",
    (req, res, next) => verifyToken(req, res, next, UserPrivateKey),
    bookingHistoryController
);

module.exports = router;