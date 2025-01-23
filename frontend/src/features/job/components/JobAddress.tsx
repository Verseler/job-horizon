import React from "react";
import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

type Size = "default" | "sm" | "lg";

type JobAddressProps = {
  className?: React.HtmlHTMLAttributes<HTMLElement>["className"];
  size?: Size;
  children: React.ReactNode;
};

const sizeVariants = {
  mapPin: {
    default: "size-5 min-w-5",
    sm: "size-4 min-w-4",
    lg: "size-6 min-w-6",
  },
  text: {
    default: "text-base",
    sm: "text-sm",
    lg: "text-lg",
  },
};

export default function JobAddress({
  children,
  className,
  size = "default",
}: JobAddressProps) {
  return (
    <div
      className={cn("flex items-center gap-x-1.5 text-neutral-700", className)}
    >
      <MapPin className={sizeVariants.mapPin[size]} />
      <p className={sizeVariants.text[size]}>{children}</p>
    </div>
  );
}
