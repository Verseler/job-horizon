import React from "react";

import { cn } from "@/lib/utils";

type ErrorMessageProps = {
  error: string | undefined;
  center?: boolean;
  className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
};

export default function ErrorMessage({
  error,
  center,
  className,
}: ErrorMessageProps) {
  if (!error) return;

  return (
    <p
      className={cn(
        "w-full text-sm mt-0.5 text-red-500",
        className,
        center && "text-center"
      )}
    >
      {error}
    </p>
  );
}
