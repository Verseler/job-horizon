import { User } from "@/types";

export type Job = {
  _id: string,
  title: string,
  description: string,
  address: string,
  locationType: "onsite" | "remote" | "hybrid",
  jobType: "full-time" | "part-time" | "freelance" | "internship",
  status: "open" | "closed",
  salaryType: "daily" | "weekly" | "monthly" | "single-payment" | "semi-monthly",
  minSalary: number,
  maxSalary?: number,
  skills: Array<string>,
  qualifications: Array<string>,
  jobApplications: Array<JobApplication>,
  bookmarkedBy: Array<string>,
  recruiterId: string,
  createdAt: string,
  updatedAt: string,
}

export type JobApplication = Omit<User, "userId" | "username" | "role" | "middleName"> & {
  documents: Array<File>,
  additionalInfo: Array<InfoLink>,
  jobSeekerId: string,
  status: "pending" | "accepted" | "rejected",
  createdAt: string,
}

export type ApplyJobForm = Omit<JobApplication, "status" | "createdAt"> & {
  jobId: string
}

export type CreateJobForm = Omit<Job, "_id" | "createdAt" | "updatedAt" >



export type InfoLink = {
  label: string,
  value: string
}

export type Step = {
  number: number;
  label: string;
  description?: string;
};

export type FilterOptions = Pick<Job, "jobType" | "locationType" | "salaryType" | "maxSalary" | "minSalary"> & {
  datePost: "this-week" | "this-month" | "this-year" | "today" | "this-3days";
};