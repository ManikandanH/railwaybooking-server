const express = require("express");
const bodyParser = require("body-parser");
const adminRoutes = require("./Admin/Routes");
const userRoutes = require("./User/Routes");
const ticketRoutes = require("./Ticketing/Routes");
const trainRoutes = require("./Train/Routes");
const homeRoute = require("./HomeRoute");

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(bodyParser.json());

app.use("/", homeRoute);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/trains", trainRoutes);
app.use("/ticketing", ticketRoutes);

module.exports = app;