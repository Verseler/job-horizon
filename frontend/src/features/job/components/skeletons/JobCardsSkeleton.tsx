import { Skeleton } from "@/components/ui/Skeleton";

export default function JobCardsSkeleton({ size = 3 }: { size?: number }) {
  return Array.from({ length: size }).map((_, index) => (
    <JobCardSkeleton key={index} />
  ));
}

function JobCardSkeleton() {
  return (
    <Skeleton className="p-4 rounded-md">
      <div className="flex items-center gap-x-3">
        <Skeleton className="grid rounded-md min-w-12 place-content-center size-12" />
        <div className="mb-1 space-y-2.5">
          <Skeleton className="w-56 h-5" />
          <ul className="flex items-center text-xs text-neutral-500 gap-x-2">
            <Skeleton className="w-20 h-3" />
            <Skeleton className="w-16 h-3" />
            <Skeleton className="w-24 h-3" />
          </ul>
        </div>
      </div>

      <div className="py-6 space-y-2">
        <Skeleton className="h-4 max-w-full" />
        <Skeleton className="h-4  max-w-[80%]" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-52" />
        <Skeleton className="w-20 h-3" />
      </div>
    </Skeleton>
  );
}
