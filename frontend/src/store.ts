import { create } from "zustand";
import { createJobSlice, type JobSlice } from "@/features/job/jobSlice";

const useBoundStore = create<JobSlice>()((...a) => ({
  ...createJobSlice(...a)
}))

export default useBoundStore;