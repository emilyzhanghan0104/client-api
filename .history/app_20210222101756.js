require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const port = process.env.PORT || 3001;

//api security
app.use(helmet());

//handle cors error
app.use(cors());

//MongoDB connection setup
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

if (process.env.NODE_ENV !== "production") {
  const mDb = mongoose.connection;
  mDb.on("open", () => {
    console.log("mongodb is connected");
  });
  mDb.on("error", (error) => {
    console.log("error");
  });
  // Logger
  app.use(morgan("tiny"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRouter = require("./src/routers/user.router");
const ticketRouter = require("./src/routers/ticket.router");

app.use("/v1/user", userRouter);
app.use("/v1/ticket", ticketRouter);

const handleError = require("./src/utils/errorHandler");

app.use((req, res, next) => {
  const error = new Error("Resource not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  handleError(error, res);
});

app.listen(port, () => {
  console.log(`api is ready on http://localhost:${port}`);
});
