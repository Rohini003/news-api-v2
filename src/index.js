const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = 5000;
const app = express();
const newsRoutes = require("../src/routes/newsRoutes");
const announceRouter = require("../src/routes/announceRoutes");
require("dotenv").config();


// 
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/news", newsRoutes);
app.use("/announcement", announceRouter);

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/newsv1")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error: " + err));

// Start the server
app.listen(PORT, () => {
    console.log("Listening at http://localhost:" + PORT);
});




