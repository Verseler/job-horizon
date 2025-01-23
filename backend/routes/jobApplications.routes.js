const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controller/jobApplication.controller");

router.post("/", jobApplicationController.postJobApplication)

//!TODO: select all job applications merge with job based on job seekerId
//!TODO: select all job applications based on job id
// router.get("/", jobApplicationController.getJobApplications);
// router
//   .route("/:id")
//   .get(jobApplicationController.getJobApplication)
//   .put(jobApplicationController.putJobApplication)
//   .delete(jobApplicationController.deleteJobApplication);

module.exports = router;
