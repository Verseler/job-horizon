import { useNavigate } from "react-router";

import CenterContainer from "@/components/ui/CenterContainer";
import {
  JobCards,
  JobFilterControls,
  JobSearchBox,
  JobFullView,
  useViewJobModal,
  JobCardsSkeleton,
  useGetJobsQuery,
  type Job,
} from "@/features/job";

export default function FindJobsPage() {
  const navigate = useNavigate();
  const {
    isViewJobOpen,
    closeViewJob,
    handleOpenViewJobChange,
    selectedJobId,
  } = useViewJobModal();


  const { data: jobs, isLoading, refetch } = useGetJobsQuery();
  
  const selectedJob = jobs?.find((job: Job) => job._id === selectedJobId);

  function handleApplyToJob() {
    closeViewJob();

    navigate("/apply-job", { state: { jobId: selectedJob?._id } });
  }

  return (
    <div>
      <section className="py-12 bg-slate-50 dark:bg-slate-900">
        <CenterContainer className="space-y-2">
          <h1 className="text-2xl font-semibold xl:text-3xl">
            Find your dream job
          </h1>
          <p className="text-sm xl:text-base text-slate-500">
            Looking for jobs? Browse our latest job openings to view & apply to
            the best jobs today!
          </p>
        </CenterContainer>
      </section>

      <section className="py-4">
        <CenterContainer className="flex items-start gap-3">
          <JobFilterControls refetch={refetch} isLoading={isLoading} />

          <div className="flex-1">
            <JobSearchBox />

            <div className="mt-8 space-y-3">
              {isLoading ? <JobCardsSkeleton /> : <JobCards jobs={jobs} />}
            </div>
          </div>
        </CenterContainer>

        <JobFullView
          job={selectedJob}
          isOpen={isViewJobOpen}
          onOpenChange={handleOpenViewJobChange}
          onClickApply={handleApplyToJob}
        />
      </section>
    </div>
  );
}
