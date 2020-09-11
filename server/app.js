"use strict";

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(port, () => {
	console.log(`Kanban App listening on http://localhost:${port}`);
});
