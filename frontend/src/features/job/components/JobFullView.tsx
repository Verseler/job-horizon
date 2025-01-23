import React from "react";
import { useSearchParams } from "react-router";
import { format, isToday } from "date-fns";
import {
  BriefcaseBusiness,
  CalendarArrowUp,
  CircleCheck,
  CircleDollarSign,
  Route,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/Sheet";
import {
  Job,
  JobAddress,
  JobAvatar,
  SaveButton,
  SkillList,
  useAddBookmarkMutation,
  useRemoveBookmarkMutation,
} from "@/features/job";
import { capitalize, formatPreciseTimeFromNow } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth";

type JobFullViewProps = {
  job: Job | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onClickApply: () => void;
};

export default function JobFullView({
  job,
  isOpen,
  onOpenChange,
  onClickApply,
}: JobFullViewProps) {
  const { userId } = useAuth();

  const jobId = job?._id ?? "";
  const { mutate: addBookmark } = useAddBookmarkMutation(jobId);
  const { mutate: removeBookmark } = useRemoveBookmarkMutation(jobId);

  if (!job) return; //don't render JobFullView if selected job is invalid
  const {
    title,
    description,
    address,
    createdAt,
    salaryType,
    jobType,
    locationType,
    minSalary,
    maxSalary,
    qualifications,
    skills,
    bookmarkedBy,
  } = job;

  const isPostedToday = isToday(createdAt || new Date());
  const datePostedLabel = `${isPostedToday ? "Time" : "Date"} Posted`;
  const timePosted = formatPreciseTimeFromNow(new Date(createdAt));
  const datePosted = format(new Date(createdAt), "MMMM dd, yyyy");
  const postedDate = isPostedToday ? timePosted : datePosted;
  const salary = `$${minSalary} - ${maxSalary}`;
  const salaryTypeLabel = `${salaryType} Salary`;
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
    <Sheet open={isOpen} onOpenChange={onOpenChange} modal>
      <SheetContent className="overflow-y-auto md:min-w-[40rem]">
        <SheetHeader>
          <div className="flex items-center mt-5 gap-x-3">
            <JobAvatar />
            <div>
              <SheetTitle className="line-clamp-2">{title}</SheetTitle>
              <h2 className="text-sm">Tech Company Name</h2>
            </div>
            <SaveButton active={isBookmarked} onClick={toggleBookmark} />
          </div>
        </SheetHeader>

        <div className="grid grid-cols-2 gap-4 pb-6 text-sm pt-9">
          <FeaturedCard Icon={CircleDollarSign} label={salaryTypeLabel}>
            {salary}
          </FeaturedCard>
          <FeaturedCard Icon={CalendarArrowUp} label={datePostedLabel}>
            {postedDate}
          </FeaturedCard>
          <FeaturedCard Icon={BriefcaseBusiness} label="Job Type">
            {jobTypeValue}
          </FeaturedCard>
          <FeaturedCard Icon={Route} label="Location Type">
            {locationTypeValue}
          </FeaturedCard>
        </div>

        <div className="pb-6">
          <h2 className="mb-1 font-semibold">Address: </h2>
          <JobAddress>{address}</JobAddress>
        </div>

        <div className="pb-6">
          <h2 className="mb-1 font-semibold">About the job: </h2>
          <SheetDescription>{description}</SheetDescription>
        </div>

        <div className="pb-6">
          <h2 className="mb-2 font-semibold">Qualifications:</h2>
          <QualificationList list={qualifications} />
        </div>

        <div className="pb-10">
          <h2 className="mb-3 font-semibold">Skills and Expertise:</h2>
          <SkillList list={skills} />
        </div>

        <SheetFooter className="fixed bottom-0 w-[36.6rem] bg-white pt-2 dark:bg-neutral-900 h-16">
          <Button
            onClick={onClickApply}
            size="lg"
            className="w-full font-semibold bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Apply for this position
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

type FeaturedCardProps = {
  label: string;
  Icon: any;
  children: React.ReactNode;
};

function FeaturedCard({ label, Icon, children }: FeaturedCardProps) {
  return (
    <div className="flex items-center p-3.5 border rounded-md border-neutral-200 gap-x-3">
      <div className="p-3 rounded-full bg-neutral-100 text-slate-600 max-w-max">
        <Icon className="size-4" />
      </div>
      <div className="font-semibold">
        {children}
        <h1 className="text-xs font-normal text-neutral-500">{label}</h1>
      </div>
    </div>
  );
}

function QualificationList({ list }: { list: Job["qualifications"] }) {
  if (QualificationList.length <= 0) return;

  return (
    <ul className="space-y-3">
      {list.map((qualification) => (
        <li key={qualification} className="flex items-center gap-x-2">
          <CircleCheck
            className="size-6 min-w-6"
            fill="#3b82f6"
            color="white"
          />
          <p className=" text-neutral-500">{qualification}</p>
        </li>
      ))}
    </ul>
  );
}

export function useViewJobModal() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpen = searchParams.get("open") === "true";
  const selectedJobId = searchParams.get("id");

  function handleOpen(id: string) {
    setSearchParams((params) => {
      params.set("open", "true");
      params.set("id", id);
      return params;
    });
  }

  function handleClose() {
    setSearchParams((params) => {
      params.set("open", "false");
      return params;
    });
  }

  function handleOpenChange(open: boolean) {
    setSearchParams((params) => {
      params.set("open", open ? "true" : "false");
      return params;
    });
  }

  return {
    closeViewJob: handleClose,
    openViewJob: handleOpen,
    handleOpenViewJobChange: handleOpenChange,
    isViewJobOpen: isOpen,
    selectedJobId,
  };
}
