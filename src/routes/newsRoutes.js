const express = require("express");
const router = express.Router();

const {getAllNews,addNews,deleteNews,updateNews} = require("../controllers/index")

router.get("/",getAllNews);
router.post("/post",addNews);
router.delete("/delete/:newsId",deleteNews);
router.put("/update/:newsId",updateNews);

module.exports = router;


