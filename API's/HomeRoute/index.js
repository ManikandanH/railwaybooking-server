const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send(" Welcome to Railway Booking Server ");
});

module.exports = router;