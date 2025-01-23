import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CreateJobForm, FilterOption, Job } from "@/features/job/job.types";

axios.defaults.withCredentials = true;

//* Get All Jobs
const getJobs = () => axios
.get<Array<Job>>(`${import.meta.env.VITE_BACKEND_BASE_URL}/jobs`)
.then(res => res.data)
.catch(err => {
  throw err
})

export const useGetJobsQuery = () => useQuery({
  queryKey: ["jobs"],
  queryFn: getJobs,
});


//* filtered Jobs
// const getFilteredJobs = (filterOptions) => axios
// .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/jobs`, filterOptions)
// .then(res => res.data)
// .catch(err => {
//   throw err
// })

export const useGetFilteredJobsQuery = (filterOptions: any) => { //!temporary any type
  const queryClient = useQueryClient();
 
  return useQuery({
  queryKey: ["filtered-jobs"],
  queryFn: () => axios
  .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/jobs/${JSON.stringify(filterOptions)}`)
  .then(res => res.data)
  .catch(err => {
    throw err
  }),
  select:(data) => {
    console.log("1")
    queryClient.setQueryData(["jobs"], data); // Update the "jobs" cache with the filtered jobs value
  },
  refetchOnWindowFocus: false,
  enabled: false
})}


export const createJob = (form: CreateJobForm) => axios
.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/jobs`, form)
.then(res => res.data)
.catch(err => {
  throw err
})



export const applyJob = async <T,>(form: T) => {
  console.log("applyJob api: ", form)
  return axios
  .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/job-applications`, form, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then(res => res.data).catch(err => {
    throw err
  })
}



//* ADD/REMOVE Bookmark a specific Job
const bookmarkAJob = async (Ids: { jobSeekerId: string, jobId: string  }) => {
  return await axios
  .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/bookmark-jobs`, Ids)
  .then(res => res.data)
  .catch(err => {
    throw err
  })
}

export const useAddBookmarkMutation = (jobId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookmarkAJob,
    onSuccess: (data) =>
      queryClient.setQueriesData(
        { queryKey: ["jobs"] },
        (oldJobs: Array<Job>) => {
          return oldJobs.map((job) => {
            if (job._id === jobId) {
              return { ...job, bookmarkedBy: data?.bookmarkedBy };
            }
            return job;
          });
        }
      ),
  });
}

const unbookmarkAJob = async (Ids: { jobSeekerId: string, jobId: string }) => {
  return await axios
  .delete(
    `${import.meta.env.VITE_BACKEND_BASE_URL
    }/bookmark-jobs/${Ids.jobSeekerId}/${Ids.jobId}`
  )
  .then(res => res.data)
  .catch(err => {
    throw err
  })
}

export const useRemoveBookmarkMutation = (jobId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
      mutationFn: unbookmarkAJob,
      onSuccess: (data) =>
        queryClient.setQueriesData(
          { queryKey: ["jobs"] },
          (oldJobs: Array<Job>) => {
            return oldJobs.map((job) => {
              if (job._id === jobId) {
                return { ...job, bookmarkedBy: data?.bookmarkedBy };
              }
              return job;
            });
          }
        ),
    });
}