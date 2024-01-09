
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/newsV2")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error: " + err));

  const userSchema = mongoose.Schema({
    email :{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    }
  })

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
const userModel = mongoose.model("User",userSchema)
module.exports = {newsModel,userModel}

