const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");

router.get("/search", jobController.searchJob);
router.get("/", jobController.getJobs);
router.post("/", jobController.postJob);
router
  .route("/:id")
  .get(jobController.getJob)
  .put(jobController.putJob)
  .delete(jobController.deleteJob);

module.exports = router;
