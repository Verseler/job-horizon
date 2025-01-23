import { useSearchParams } from "react-router";
import React, { useMemo, useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/Radio-group";
import { DualRangeSlider } from "@/components/ui/DualRangeSlider";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/ui/Button";
import { Slider } from "@/components/ui/Slider";
import { Label } from "@/components/ui/Label";
import { capitalize, debounce } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/Select";
import { FilterOption, Job, useGetFilteredJobsQuery, } from "@/features/job";
import { Input } from "@/components/ui/Input";

const MIN_SALARY = 0;
const MAX_SALARY = 1_000_000;

const data: {
  filterOptionKeys: FilterOption;
  jobType: Array<Job["jobType"]>;
  salaryType: Array<Job["salaryType"]>;
  locationType: Array<Job["locationType"]>;
} = {
  filterOptionKeys: [
    "date-post",
    "job-type",
    "salary-type",
    "min-salary",
    "max-salary",
    "location-type",
  ],
  jobType: ["full-time", "part-time", "freelance", "internship"],
  salaryType: ["daily", "monthly", "weekly", "single-payment", "semi-monthly"],
  locationType: ["onsite", "remote", "hybrid"],
};

//TODO: add types. But make sure to change the job types. make it consistence. use lowercase
export default function JobFilterControls() {
  const [searchParams, setSearchParams] = useSearchParams();
  const datePost = searchParams.get("date-post") ?? "";
  const jobType = searchParams.get("job-type") ?? "";
  const locationType = searchParams.get("location-type") ?? "";
  const salaryType = searchParams.get("salary-type") ?? "";
  const minSalary = Number(searchParams.get("min-salary") ?? MIN_SALARY);
  const maxSalary = Number(searchParams.get("max-salary") ?? MAX_SALARY);
  const [salaryValue, setSalaryValue] = useState([minSalary, maxSalary]);
  const { refetch } = useGetFilteredJobsQuery({
    datePost,
    jobType,
    locationType,
    minSalary,
    maxSalary,
  });

  function handleSubmitJobFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    refetch();
  }

  //Add debounce in updating the searchParams for min and max salary to prevent ISSUE: browser to navigate repeatedly
  const debouncedSetSearchParams = useMemo(
    () =>
      debounce((newValues: number[]) => {
        setSearchParams((params) => {
          params.set("min-salary", String(newValues[0]));
          params.set("max-salary", String(newValues[1]));
          return params;
        });
      }, 300),
    [setSearchParams]
  );

  //fix: To much update error
  function handleOnSalaryChange(value: Array<number>) {
    const salaryValues = value.length === 2 ? value : [...value, MAX_SALARY]; //add a value for max because when selecting "Single payment" it will caused an error because it only accept min salary

    setSalaryValue(salaryValues);
    debouncedSetSearchParams(salaryValues);
  }

  function handleClearFilter() {
    setSearchParams((params) => {
      data.filterOptionKeys.forEach((key) => {
        if (params.has(key)) {
          params.delete(key);
        }
      });
      return params;
    });

    setSalaryValue([MIN_SALARY, MAX_SALARY]);
  }

  return (
    <form
      onSubmit={handleSubmitJobFilter}
      className="border rounded-md min-w-72 max-h-max"
    >
      <div className="flex items-center justify-between px-4 py-1 border-b">
        <h1 className="text-base font-semibold">Filter</h1>
        <Button
          onClick={handleClearFilter}
          type="button"
          variant="link"
          className="p-0 text-sm font-medium text-red-500 hover:text-red-700 hover:no-underline"
        >
          Clear all
        </Button>
      </div>

      <div className="p-4 pb-7">
        <div className="space-y-1.5">
          <h2 className="text-sm font-medium">Date Post</h2>
          <Select
            value={datePost ?? ""}
            onValueChange={(value) =>
              setSearchParams((params) => {
                params.set("date-post", value);
                return params;
              })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-3days">Within 3 days</SelectItem>
                <SelectItem value="this-week">Within this week</SelectItem>
                <SelectItem value="this-month">Within this month</SelectItem>
                <SelectItem value="this-year">Within this year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Separator className="mb-5 mt-7" />

        <div className="space-y-1.5">
          <h2 className="text-sm font-medium">Job Type</h2>
          <CheckboxGroup typeKey="job-type" options={data.jobType} />
        </div>
        <Separator className="mb-5 mt-7" />

        <div className="space-y-3">
          <h2 className="text-sm font-medium">Range Salary</h2>
          <RadioGroup
            className="grid grid-cols-2 gap-1.5"
            value={salaryType ?? ""}
            onValueChange={(value) =>
              setSearchParams((params) => {
                params.set("salary-type", value);
                return params;
              })
            }
          >
            {data.salaryType.map((option) => {
              const optionLabel = capitalize(option);

              return (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={option} />
                  <Label
                    className="font-normal text-neutral-500"
                    htmlFor={option}
                  >
                    {optionLabel}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          <div>
            <div className="mt-5">
              {salaryType === "single-payment" ? (
                <Slider
                  value={[salaryValue[0]]}
                  onValueChange={handleOnSalaryChange}
                  step={1}
                  min={0}
                  max={1000000}
                />
              ) : (
                <DualRangeSlider
                  value={salaryValue}
                  onValueChange={handleOnSalaryChange}
                  step={1}
                  min={0}
                  max={1000000}
                />
              )}
              <div className="flex justify-between mt-3 text-neutral-500">
                <div className="relative flex items-center">
                  <Label
                    htmlFor="min-salary"
                    className="absolute px-2 text-xs border-e border-neutral-500"
                  >
                    MIN
                  </Label>
                  <Input
                    type="number"
                    inputMode="numeric"
                    id="min-salary"
                    className="text-xs w-[7.5rem] ps-[3.2rem] pe-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    value={salaryValue[0]}
                    min={MIN_SALARY}
                    max={MAX_SALARY}
                    onChange={(e) =>
                      handleOnSalaryChange([
                        Number(e.target.value),
                        salaryValue[1],
                      ])
                    }
                  />
                </div>
                {salaryType !== "single-payment" && (
                  <div className="relative flex items-center">
                    <Label
                      htmlFor="max-salary"
                      className="absolute px-2 text-xs border-e border-neutral-500"
                    >
                      MAX
                    </Label>
                    <Input
                      type="number"
                      inputMode="numeric"
                      id="max-salary"
                      className="text-xs w-[7.5rem] ps-[3.2rem] pe-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      value={salaryValue[1]}
                      min={MIN_SALARY}
                      max={MAX_SALARY}
                      onChange={(e) =>
                        handleOnSalaryChange([
                          salaryValue[0],
                          Number(e.target.value),
                        ])
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Separator className="mb-5 mt-7" />

        <div className="space-y-1.5">
          <h2 className="text-sm font-medium">Location Type</h2>
          <CheckboxGroup typeKey="location-type" options={data.locationType} />
        </div>
        <Separator className="mb-5 mt-7" />

        <Button
          type="submit"
          className="w-full bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-400"
        >
          Apply
        </Button>
      </div>
    </form>
  );
}
