
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/newsV2")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error: " + err));

  
 const newsSchema = mongoose.Schema({
    heading : {
        type : String,
        required : true,
    },
    author : {
        type : String,
        required : true,
    },
    newsContent : {
        type : String,
        required : true,
    }
 })

const newsModel = mongoose.model("News",newsSchema);

module.exports = {newsModel}

