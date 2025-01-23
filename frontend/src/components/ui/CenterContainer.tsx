import React from "react";

import { cn } from "@/lib/utils";

type CenterContainerProps = {
  className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
  children: React.ReactNode;
};

export default function CenterContainer({
  className,
  children,
}: CenterContainerProps) {
  return (
    <div className={cn("mx-auto px-4 md:px-6 lg:container", className)}>{children}</div>
  );
}
