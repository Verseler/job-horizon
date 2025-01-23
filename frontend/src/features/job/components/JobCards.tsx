import { format, isToday } from "date-fns";

import { capitalize, formatPreciseTimeFromNow } from "@/lib/utils";
import SaveButton from "@/features/job/components/SaveButton";
import { DotSeperator } from "@/components/ui/Separator";
import { useAuth } from "@/features/auth";
import {
  JobAvatar,
  JobAddress,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
  type Job,
  SkillList,
  useViewJobModal,
} from "@/features/job";

type JobCardsProps = {
  jobs: Array<Job> | undefined;
};

export default function JobCards({ jobs }: JobCardsProps) {
  const { openViewJob } = useViewJobModal();

  return jobs?.map((job) => (
    <JobCard key={job._id} onClick={() => openViewJob(job._id)} {...job} />
  ));
}

type JobCardProps = Omit<Job, "id" | "requiredExperience"> & {
  onClick: () => void;
};

function JobCard({
  _id: jobId,
  address,
  createdAt,
  description,
  locationType,
  jobType,
  maxSalary,
  minSalary,
  salaryType,
  skills,
  title,
  onClick,
  bookmarkedBy,
}: JobCardProps) {
  const { userId } = useAuth();

  const { mutate: addBookmark } = useAddBookmarkMutation(jobId);
  const { mutate: removeBookmark } = useRemoveBookmarkMutation(jobId);

  const timePosted = `${formatPreciseTimeFromNow(new Date(createdAt))}`;
  const datePosted = format(new Date(createdAt), "MMMM dd, yyyy");
  const postedDate = isToday(createdAt) ? timePosted : datePosted;
  const salary = `$${minSalary} - $${maxSalary} ${capitalize(salaryType)}`;
  const isBookmarked = bookmarkedBy?.includes(userId || "");
  const jobTypeValue = capitalize(jobType);
  const locationTypeValue = capitalize(locationType);

  async function toggleBookmark(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    if (!userId) return;

    if (isBookmarked) {
      removeBookmark({ jobId: jobId, jobSeekerId: userId });
    } else {
      addBookmark({ jobId: jobId, jobSeekerId: userId });
    }
  }

  return (
    <div className="p-4 border rounded-md" onClick={onClick} role="button">
      <div className="flex items-center gap-x-3">
        <JobAvatar />
        <div className="mb-1 space-y-1">
          <h1>{title}</h1>
          <ul className="flex items-center text-xs text-neutral-500 gap-x-2">
            <li>{jobTypeValue}</li>
            <DotSeperator />
            <li>{locationTypeValue} work</li>
            <DotSeperator />
            <li>{salary}</li>
          </ul>
        </div>
        <SaveButton active={isBookmarked} onClick={toggleBookmark} />
      </div>

      <div className="py-3">
        <p className="text-sm text-neutral-500 line-clamp-2">{description}</p>
      </div>

      <ul className="flex flex-wrap items-center gap-2 pb-6">
        <SkillList list={skills} />
      </ul>

      <div className="flex items-center justify-between">
        <JobAddress size="sm">{address}</JobAddress>
        <p className="text-xs text-slate-400">{postedDate}</p>
      </div>
    </div>
  );
}
