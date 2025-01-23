import { useNavigate } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import CenterContainer from "@/components/ui/CenterContainer";
import { useAuth } from "@/features/auth";
import {
  Job,
  JobCards,
  JobFullView,
  JobSearchBox,
  useViewJobModal,
  useGetJobsQuery,
  getAppliedJobs,
  getSavedJobs,
} from "@/features/job";

export default function MyJobsPage() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const {
    closeViewJob,
    handleOpenViewJobChange,
    isViewJobOpen,
    selectedJobId,
  } = useViewJobModal();

  const { data: jobs } = useGetJobsQuery();
  const appliedJobs = getAppliedJobs(jobs, userId);
  const savedJobs = getSavedJobs(jobs, userId);

  const selectedJob = jobs?.find((job: Job) => job._id === selectedJobId);

  const handleApplyToJob = () => {
    closeViewJob();

    navigate("/apply-job", { state: { jobId: selectedJob?._id } });
  };

  return (
    <div className="py-8">
      <CenterContainer className="xl:max-w-6xl">
        <Tabs defaultValue="applied">
          <div className="flex items-center justify-between mb-8 gap-x-6">
            <TabsList className="grid grid-cols-2 w-72">
              <TabsTrigger value="applied">Applied</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <JobSearchBox className="flex-1 max-w-lg p-0 border-none" />
          </div>
          <TabsContent value="applied">
            <div className="space-y-3">
              <JobCards jobs={appliedJobs} />
            </div>
          </TabsContent>
          <TabsContent value="saved">
            <div className="space-y-3">
              <JobCards jobs={savedJobs} />
            </div>
          </TabsContent>
        </Tabs>
      </CenterContainer>

      <JobFullView
        isOpen={isViewJobOpen}
        onOpenChange={handleOpenViewJobChange}
        job={selectedJob}
        onClickApply={handleApplyToJob}
      />
    </div>
  );
}
