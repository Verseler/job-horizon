const express = require("express");
const router = express.Router();
const bookmarkJobController = require("../controller/bookmarkJob.controller");

router.post("/", bookmarkJobController.postBookmark);
router.delete("/:jobSeekerId/:jobId", bookmarkJobController.deleteBookmark);

module.exports = router;
