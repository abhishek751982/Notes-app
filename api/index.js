require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/note.model.js");
const noteRoute = require("./routes/note.route.js");
var cors = require("cors");
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;

app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route
app.use("/api/notes", noteRoute);

app.get("/", (req, res) => {
  res.send("Hello from node api");
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000.");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
