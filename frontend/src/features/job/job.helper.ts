import type { Job } from "@/features/job"

export function removeFalsyElements<T>(arr: Array<T>): Array<T> {
    return arr.filter(n => n)
}

export function getSavedJobs(jobs: Array<Job> | undefined, userId: string | null) {
    if(!jobs || !userId) return;
    
    return jobs.filter((job) => job.bookmarkedBy.includes(userId));
}

 //!fix this later
 export function getAppliedJobs(jobs: Array<Job> | undefined, userId: string | null) {
    if(!jobs || !userId) return;
    
    return jobs.filter((job) => {
        const appliedJob = job.jobApplications.filter(
            (jobApplication) => jobApplication.jobSeekerId === userId
          ).length > 0

        return appliedJob;
    });
}