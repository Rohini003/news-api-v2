const express = require("express");
const router = express.Router();
const NewsController = require("../controllers/newsController.js")

const newsController = new NewsController();

router.get("/", newsController.fetchAll.bind(newsController));
router.post("/post", newsController.create.bind(newsController));
router.delete("/delete/:newsId", newsController.delete.bind(newsController));
router.patch("/update/:newsId", newsController.update.bind(newsController));

module.exports = router;