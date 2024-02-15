const express = require("express");
const router = express.Router();
const AnnounceController = require("../controllers/announce.controller");
const upload = require("../modules/multer");

const announceController = new AnnounceController();

router.get("/", announceController.fetchAll);
router.post("/post", upload, announceController.create);
router.delete("/delete/:id", announceController.delete);
router.patch("/update/:id", announceController.update);

module.exports = router;
