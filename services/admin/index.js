const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const adminRoutes = require('./Routes');

const currentEnvironment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${currentEnvironment}` });
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(bodyParser.json());
app.get("/", (req, res) => {
    res.send(" Welcome to Admin service of Railway Booking Server");
});

app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});