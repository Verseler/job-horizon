import { useSearchParams } from "react-router";

import { Checkbox } from "@/components/ui/Checkbox";
import { capitalize, cn } from "@/lib/utils";
import React from "react";

type CheckboxGroupProps = {
  options: Array<string>;
  typeKey: string;
  className?: React.HtmlHTMLAttributes<HTMLDivElement>["className"];
};

export default function CheckboxGroup({
  options,
  typeKey,
  className,
}: CheckboxGroupProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeParams = searchParams.get(typeKey);
  const selectedTypes = new Set(typeParams ? typeParams.split(",") : []);

  function handleCheckedChange(checked: boolean, option: string) {
    if (checked) {
      selectedTypes.add(option);
    } else {
      selectedTypes.delete(option);
    }
    updateSearchParams();

    if (selectedTypes.size <= 0) {
      removeParamInUrl();
    }
  }

  function removeParamInUrl() {
    setSearchParams((params) => {
      params.delete(typeKey);
      return params;
    });
  }

  function updateSearchParams() {
    setSearchParams((params) => {
      params.set(typeKey, Array.from(selectedTypes).join(","));
      return params;
    });
  }

  return (
    <div className={cn("grid grid-cols-2 gap-1.5", className)}>
      {options.map((option) => {
        const optionIsChecked = Array.from(selectedTypes).includes(option);
        const optionLabel = capitalize(option);

        return (
          <div key={option} className="flex items-center gap-x-2">
            <Checkbox
              checked={optionIsChecked}
              onCheckedChange={(checked) =>
                handleCheckedChange(checked as boolean, option)
              }
            />
            <span className="text-sm text-neutral-600">{optionLabel}</span>
          </div>
        );
      })}
    </div>
  );
}
