require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const indexRouter = require("./routes/indexRouter");
const errHandler = require("./middlewares/errHandler.js");
const taskRouter = require("./routes/taskRouter");
const categoryRouter = require("./routes/categoryRouter");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// index routes
app.use("/", indexRouter);

// category routes
app.use("/categories", categoryRouter);

// task routes
app.use("/tasks", taskRouter);

// error handler
app.use(errHandler);

app.listen(port, () => {
  console.log(`Kanban app listening at http://localhost:${port}`);
});