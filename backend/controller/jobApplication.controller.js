const Job = require("../models/job.model");
const mongoose = require("mongoose");

module.exports.postJobApplication = async (req, res) => {
  try {
    const { jobId, jobSeekerId } = req.body;
    console.log(req.body);

    //Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(jobSeekerId) ||
      !mongoose.Types.ObjectId.isValid(jobId)
    ) {
      return res.status(400).json({ message: "Invalid user ID or job ID" });
    }

    //Find job
    const job = await Job.findById(jobId);
    //Check if the job application request by a job seeker is already existed
    const isAlreadyApplied = job.jobApplications.some(
      (jobApplication) => jobApplication.jobSeekerId.toString() === jobSeekerId
    );
    if (isAlreadyApplied) {
      return res.status(400).json({ message: "Job was already applied" });
    }

    //Add job application
    job.jobApplications.push(req.body);
    await job.save();

    res.status(201).json({
      message: "Job applied successfully",
      jobApplications: job.jobApplications,
    });
  } catch (error) {
    console.log("Error adding jobApplication: ", error);
    res.status(500).json({ message: "Failed to add job application" });
  }
};

// module.exports.putJobApplication = async (req, res) => {
//   await JobApplication.findByIdAndUpdate(req.params.id, req.body)
//     .then((jobApplication) => {
//       if (!jobApplication)
//         return res.status(404).json({ message: "Job Application not found" });
//       res.status(200).json(jobApplication);
//     })
//     .catch((err) => res.status(500).json(err));
// };

// module.exports.deleteJobApplication = async (req, res) => {
//   await JobApplication.findByIdAndDelete(req.params.id)
//     .then((jobApplication) => {
//       if (!jobApplication)
//         return res.status(404).json({ message: "Job Application not found" });
//       res.status(200).json(jobApplication);
//     })
//     .catch((err) => res.status(500).json(err));
// };
