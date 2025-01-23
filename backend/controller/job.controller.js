const Job = require("../models/job.model");

module.exports.postJob = async (req, res) => {
  try {
    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (err) {
    console.error("Error creating job:", err);
    res.status(500).json({ message: "Failed to create job" });
  }
};

module.exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate(
      "jobApplications.jobSeekerId",
      "firstName lastName"
    ); // Populate job seeker details
    res.status(200).json(jobs);
  } catch (err) {
    console.error("[GET] jobs:", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

module.exports.getFilteredJobs = async (req, res) => {
  try {
    const {
      datePost,
      jobType,
      locationType,
      salaryType,
      minSalary,
      maxSalary,
    } = req.params;
    console.log("params: ", req.params);
    const query = {};

    // Date filter
    if (datePost) {
      const now = new Date();
      let startDate;
      switch (datePost) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "this-3days":
          startDate = new Date(now.setDate(now.getDate() - 3));
          break;
        case "this-week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "this-month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case "this-year":
          startDate = new Date(now.setFullYear(now.getFullYear() - 1));
          break;
        default:
          startDate = null;
      }
      if (startDate) query.createdAt = { $gte: startDate };
    }

    // Job type filter
    if (jobType) query.jobType = jobType;

    // Location type filter
    if (locationType) query.locationType = locationType;

    // Salary type filter
    if (salaryType) query.salaryType = salaryType;

    // Salary range filter
    if (minSalary || maxSalary) {
      query.$and = [];
      if (minSalary) {
        query.$and.push({ minSalary: { $gte: Number(minSalary) } });
      }
      if (maxSalary) {
        query.$and.push({ maxSalary: { $lte: Number(maxSalary) } });
      }
    }

    const filteredJobs = await Job.find(query).populate(
      "jobApplications.jobSeekerId",
      "firstName lastName"
    );
    //console.log(filteredJobs);
    res.status(200).json(filteredJobs);
  } catch (err) {
    console.log("[GET] filtered jobs: ", err);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

module.exports.getJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;

    const job = await Job.findById(jobId).populate(
      "jobApplications.jobSeekerId",
      "firstName lastName"
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    console.error("[GET] job:", err);
    res.status(500).json({ message: "Failed to fetch job" });
  }
};

module.exports.putJob = async (req, res) => {
  await Job.findByIdAndUpdate(req.params.id, req.body)
    .then((job) => {
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.status(200).json(job);
    })
    .catch((err) => res.status(500).json(err));
};

module.exports.deleteJob = async (req, res) => {
  await Job.findByIdAndDelete(req.params.id)
    .then((job) => {
      if (!job) return res.status(404).json({ message: "Job not found" });
      res.status(200).json(job);
    })
    .catch((err) => res.status(500).json(err));
};
