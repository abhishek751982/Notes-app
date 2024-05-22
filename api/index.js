const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/note.model.js");
const noteRoute = require("./routes/note.route.js");
var cors = require("cors");
const app = express();

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
  .connect(
    "mongodb+srv://abhishek751982:8JAnoeqXR0xakeaz@backenddb.monlshz.mongodb.net/notes-app?retryWrites=true&w=majority&appName=BackendDb"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
      console.log("Server is running on port 5000.");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
