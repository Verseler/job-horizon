import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & { error?: string | undefined }
>(({ className, error, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border  bg-transparent px-3 py-2 text-base  focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ",
        className,
        error
          ? "border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 file:text-red-500 placeholder:text-red-500 focus-visible:ring-red-500 dark:file:text-red-500 dark:placeholder:text-red-500 dark:focus-visible:ring-red-500"
          : "border-neutral-200 dark:border-neutral-800 file:text-neutral-950 placeholder:text-neutral-500 focus-visible:ring-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300"
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
