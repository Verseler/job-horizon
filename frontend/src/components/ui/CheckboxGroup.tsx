import { useSearchParams } from "react-router";

import { Checkbox } from "@/components/ui/Checkbox";
import { capitalize } from "@/lib/utils";

type CheckboxGroupProps = {
  options: Array<string>;
  typeKey: string;
};

export default function CheckboxGroup({
  options,
  typeKey,
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
  }

  function updateSearchParams() {
    setSearchParams((params) => {
      params.set(typeKey, Array.from(selectedTypes).join(","));
      return params;
    });
  }

  return (
    <div className="grid grid-cols-2 gap-1.5">
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
