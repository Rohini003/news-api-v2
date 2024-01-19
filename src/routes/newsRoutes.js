const express = require("express");
const router = express.Router();

const {fetchAll,addNews,deleteNews,updateNews} = require("../controllers/index")

router.get("/",fetchAll);
router.post("/post",addNews);
router.delete("/delete/:newsId",deleteNews);
router.patch("/update/:newsId",updateNews);

module.exports = router;


