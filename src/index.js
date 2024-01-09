const express = require("express")
const bodyParser = require("body-parser");
const PORT = 5000;
const app = express();
const newsRoutes = require("../src/routes/newsRoutes")
const {News} = require("../src/db/models")

app.use(bodyParser.json())
app.use("/news",newsRoutes);

app.listen(PORT , ()=>{
    console.log("Listening at" + PORT);
})
