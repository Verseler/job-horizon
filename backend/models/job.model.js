const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a title"],
    },
    description: {
      type: String,
      required: [true, "Please enter a description"],
    },
    address: {
      type: String,
      required: [true, "Please enter a address"],
    },
    locationType: {
      type: String,
      required: [true, "Please enter a location type"],
    },
    jobType: {
      type: String,
      required: [true, "Please enter a job type"],
    },
    status: {
      type: String,
      required: [true, "Please enter a status"],
    },
    salaryType: {
      type: String,
      required: [true, "Please enter a salary Type"],
    },
    minSalary: {
      type: Number,
      required: [true, "Please enter a minimum salary"],
    },
    maxSalary: Number,
    skills: {
      type: [String],
      required: [true, "Please provide at least one skill"],
    },
    qualifications: {
      type: [String],
      required: [true, "Please provide at least one qualification"],
    },
    jobApplications: [
      {
        jobSeekerId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        email: {
          type: String,
          required: true,
        },
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        age: {
          type: Number,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        documents: [mongoose.Schema.Types.Mixed],
        additionalInfo: [
          {
            label: String,
            value: String,
          },
        ],
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    bookmarkedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("job", jobSchema);
module.exports = Job;
