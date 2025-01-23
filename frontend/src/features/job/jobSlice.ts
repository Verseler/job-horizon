import { StateCreator } from "zustand"
import type { ApplyJobForm, CreateJobForm } from "@/features/job"

const DEFAULT_CREATE_JOB_FORM: CreateJobForm = {
  title: "",
  description: "",
  skills: [""],
  qualifications: [""],
  locationType: "onsite",
  jobType: "full-time",
  minSalary: 0,
  maxSalary: 0,
  salaryType: "daily",
  address: "",
  status: "open",
  bookmarkedBy: [""],
  jobApplications: [],
  recruiterId: ""
}

const DEFAULT_APPLY_JOB_FORM: ApplyJobForm = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  age: 0,
  documents: [],
  additionalInfo: [{label: "", value: ""}],
  jobId: "",
  jobSeekerId: ""
}

export type JobSlice = {
  createJobForm: CreateJobForm,
  setCreateJobForm: (key: keyof CreateJobForm, value: number | string | Array<string>) =>void;
  resetCreateJobForm: () => void;
  applyJobForm: ApplyJobForm,
  setApplyJobForm: (key: keyof ApplyJobForm, value:  number | string | ApplyJobForm["documents"] | ApplyJobForm["additionalInfo"]) => void;
  resetApplyJobForm: () => void;
}

export const createJobSlice: StateCreator<JobSlice> = (set) => ({
  createJobForm: DEFAULT_CREATE_JOB_FORM,
  setCreateJobForm: (key, value) => {
    set((prev) => ({ createJobForm: {...prev.createJobForm, [key]: value}}))
  },
  resetCreateJobForm: () => set({createJobForm: DEFAULT_CREATE_JOB_FORM}),

  applyJobForm: DEFAULT_APPLY_JOB_FORM,
  setApplyJobForm: (key, value) => {
    set((prev) => ({ applyJobForm: {...prev.applyJobForm, [key]: value}}))
  },
  resetApplyJobForm: () => set({applyJobForm: DEFAULT_APPLY_JOB_FORM})
})