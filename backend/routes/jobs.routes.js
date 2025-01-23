const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");

router.post("/", jobController.postJob);
//router.get("/", jobController.getJobs);
router.get("/", jobController.getFilteredJobs);
router
  .route("/:id")
  .get(jobController.getJob)
  .put(jobController.putJob)
  .delete(jobController.deleteJob);

module.exports = router;
