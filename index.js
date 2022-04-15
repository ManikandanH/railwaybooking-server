const express = require("express");

const dotenv = require("dotenv");
const currentEnvironment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${currentEnvironment}` });

const app = express();

const routes = require(`./API's/index`);

app.use(routes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});