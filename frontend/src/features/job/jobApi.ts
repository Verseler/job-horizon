import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CreateJobForm, Job } from "@/features/job";

axios.defaults.withCredentials = true;

//* Get All Jobs
const getJobs = async () => {
  const queryParams = new URLSearchParams(window.location.search).toString();

  return axios
  .get<Array<Job>>(`${import.meta.env.VITE_BACKEND_BASE_URL}/jobs?${queryParams}`)
  .then(res => res.data)
  .catch(err => {
    throw err
  })
}

export const useGetJobsQuery = () => useQuery({
  queryKey: ["jobs"],
  queryFn: getJobs,
})


//* Search jobs by title
const searchJobs = async ({ queryKey }: { queryKey: Array<string>}) => {
  const [_, search] = queryKey;

  return axios
  .get<Array<Job>>(`${import.meta.env.VITE_BACKEND_BASE_URL}/jobs/search?search=${search}`)
  .then(res => res.data)
  .catch(err => {
    throw err
  })
}

export const useSearchJobsQuery = (search: string) => {
  const queryClient = useQueryClient();

 return  useQuery({
  queryKey: ["searched-jobs", search],
  queryFn: searchJobs,
  enabled: false,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
  select: (data) => {
    console.log("searched jobs: ", data)
    queryClient.setQueriesData(
      { queryKey: ["jobs"] },
      data
    )
  }
})
}
  
 


export const createJob = (form: CreateJobForm) => axios
.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/jobs`, form)
.then(res => res.data)
.catch(err => {
  throw err
})



export const applyJob = async <T,>(form: T) => {
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