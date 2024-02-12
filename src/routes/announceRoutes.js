const express = require("express");
const router = express.Router();
const {create,fetchAll,Delete,update} = require("../controllers/announce.controller");
const upload = require("../modules/multer")


router.get("/",fetchAll);
router.post("/post",upload,create);
router.delete("/delete/:announcementId",Delete);
router.patch("/update/:newsId",update);

module.exports = router;