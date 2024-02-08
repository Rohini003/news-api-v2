const express = require("express");
const router = express.Router();

const {fetchAll,create,Delete,update} = require("../controllers/newsController.js")

router.get("/",fetchAll);
router.post("/post",create);
router.delete("/delete/:newsId",Delete);
router.patch("/update/:newsId",update);

module.exports = router;


