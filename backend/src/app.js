const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articleRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/articles", articleRoutes);

module.exports = app;
