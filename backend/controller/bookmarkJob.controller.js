const Job = require("../models/job.model");
const mongoose = require("mongoose");

// Add a bookmark
module.exports.postBookmark = async (req, res) => {
  try {
    const { jobId, jobSeekerId } = req.body;

    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(jobSeekerId) ||
      !mongoose.Types.ObjectId.isValid(jobId)
    ) {
      return res.status(400).json({ message: "Invalid user ID or job ID" });
    }

    // Find job
    const job = await Job.findById(jobId);

    // Check if the job is already bookmarked by the user
    const isAlreadyBookmarked = job.bookmarkedBy.some(
      (bookmark) => bookmark.toString() === jobSeekerId
    );
    if (isAlreadyBookmarked) {
      return res.status(400).json({ message: "Job already bookmarked" });
    }

    // Add bookmark
    job.bookmarkedBy.push(jobSeekerId);
    await job.save();

    res.status(201).json({
      message: "Job bookmarked successfully",
      bookmarkedBy: job.bookmarkedBy,
    });
  } catch (error) {
    console.error("Error adding bookmark:", error);
    res.status(500).json({ message: "Failed to add bookmark" });
  }
};

// Remove a bookmark
module.exports.deleteBookmark = async (req, res) => {
  try {
    const { jobSeekerId, jobId } = req.params;
    console.log("jobSeekerId ", jobSeekerId, " jobId ", jobId);
    // Validate IDs
    if (
      !mongoose.Types.ObjectId.isValid(jobSeekerId) ||
      !mongoose.Types.ObjectId.isValid(jobId)
    ) {
      return res.status(400).json({ message: "Invalid user ID or job ID" });
    }

    // Find job
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Remove bookmark
    const initialCount = job.bookmarkedBy.length;
    job.bookmarkedBy = job.bookmarkedBy.filter(
      (bookmark) => bookmark.toString() !== jobSeekerId
    );
    if (initialCount === job.bookmarkedBy.length) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    await job.save();
    console.log("unbookmarked");
    res.status(200).json({
      message: "Bookmark removed successfully",
      bookmarkedBy: job.bookmarkedBy,
    });
  } catch (error) {
    console.error("Error removing bookmark:", error);
    res.status(500).json({ message: "Failed to remove bookmark" });
  }
};
