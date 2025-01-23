import { type LucideIconType } from "@/types";
import React from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio-group";
import { cn } from "@/lib/utils";
import { Job } from "@/features/job";

export type TSelectRadioItem = {
  id: number | string;
  type: Job["jobType"] | Job["salaryType"] | Job["locationType"];
  Icon: LucideIconType;
};

type SelectRadioProps = {
  data: Array<TSelectRadioItem>;
  value: string | undefined;
  onValueChange: (e: string) => void;
  className?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
};

export default function SelectRadio({
  data,
  onValueChange,
  value,
  className,
  ...props
}: SelectRadioProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onValueChange}
      className={cn("grid grid-cols-3", className)}
      {...props}
    >
      {data.map((item) => (
        <SelectRadioItem
          key={item.id}
          Icon={item.Icon}
          type={item.type}
          isActive={item.type === value}
        />
      ))}
    </RadioGroup>
  );
}

type RadioButtonProps = Omit<TSelectRadioItem, "id"> & {
  isActive: boolean;
};

function SelectRadioItem({ Icon, type, isActive }: RadioButtonProps) {
  const isActiveStyle = isActive ? "text-green-700" : "";
  const isActiveBorderStyle = isActive ? "border-green-600" : "";

  return (
    <label
      htmlFor={type}
      role="button"
      className={cn(
        "flex items-center space-x-2 relative py-2.5 gap-x-1 px-3 border select-none rounded-lg",
        isActiveBorderStyle
      )}
    >
      <Icon className={cn("size-4", isActiveStyle)} />
      <p className={cn("font-normal text-sm", isActiveStyle)}>{type}</p>

      <RadioGroupItem className="hidden" value={type} id={type} />
      {isActive && <ActiveDotIndicator />}
    </label>
  );
}

function ActiveDotIndicator() {
  return (
    <div className="absolute border-2 border-green-600 rounded-full right-2.5 size-3" />
  );
}
