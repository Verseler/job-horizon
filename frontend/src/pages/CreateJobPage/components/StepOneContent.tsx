import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Building2,
  Calendar,
  Calendar1,
  CalendarDays,
  CalendarMinus2,
  Clock12,
  Clock3,
  Globe,
  HandCoins,
  Library,
  MapPinHouse,
  MapPinMinusInside,
} from "lucide-react";

import type { TSelectRadioItem } from "@/pages/CreateJobPage/components/SelectRadio";
import SelectRadio from "@/pages/CreateJobPage/components/SelectRadio";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import useBoundStore from "@/store";

type selectRadioData = {
  locationType: Array<TSelectRadioItem>;
  jobType: Array<TSelectRadioItem>;
  salaryType: Array<TSelectRadioItem>;
};

const data: selectRadioData = {
  locationType: [
    { id: 1, type: "onsite", Icon: Building2 },
    { id: 2, type: "remote", Icon: MapPinHouse },
    { id: 3, type: "hybrid", Icon: MapPinMinusInside },
  ],
  jobType: [
    { id: 1, type: "full-time", Icon: Clock12 },
    { id: 2, type: "part-time", Icon: Clock3 },
    { id: 3, type: "freelance", Icon: Globe },
    { id: 4, type: "internship", Icon: Library },
  ],
  salaryType: [
    { id: 1, type: "daily", Icon: Calendar1 },
    { id: 2, type: "weekly", Icon: CalendarDays },
    { id: 3, type: "semi-monthly", Icon: CalendarMinus2 },
    { id: 4, type: "monthly", Icon: Calendar },
    { id: 5, type: "single-payment", Icon: HandCoins },
  ],
};

const StepOneFormSchema = z
  .object({
    title: z.string().min(1, { message: "Required" }),
    description: z.string().min(1, { message: "Required" }),
    address: z.string().min(1, { message: "Required" }),
    locationType: z.enum(["onsite", "remote", "hybrid"]),
    jobType: z.enum(["full-time", "part-time", "freelance", "internship"]),
    salaryType: z.enum(["daily", "weekly", "semi-monthly", "monthly", "single-payment"]),
    minSalary: z.number().nonnegative().min(1, { message: "Required" }),
    maxSalary: z.number().nonnegative(),
  })
  .refine((data) => data.maxSalary >= data.minSalary, {
    message: "Max salary should not be less than minimum salary",
    path: ["maxSalary"],
  });
type StepOneFormSchemaType = z.infer<typeof StepOneFormSchema>;

type StepOneContentProps = {
  nextStep: () => void;
};

export default function StepOneContent({ nextStep }: StepOneContentProps) {
  const stepOneForm = useBoundStore((state) => state.createJobForm);
  const setStepOneForm = useBoundStore((state) => state.setCreateJobForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<StepOneFormSchemaType>({
    resolver: zodResolver(StepOneFormSchema),
    defaultValues: {
      title: stepOneForm.title,
      description: stepOneForm.description,
      address: stepOneForm.address,
      locationType: stepOneForm.locationType,
      jobType: stepOneForm.jobType,
      salaryType: stepOneForm.salaryType,
      minSalary: stepOneForm.minSalary,
      maxSalary: stepOneForm.maxSalary,
    },
  });
  const hasError = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<StepOneFormSchemaType> = async (formData) => {
    //* update global createJobForm state with values of each inputs
    Object.keys(formData).forEach((k) => {
      const key = k as keyof StepOneFormSchemaType;
      setStepOneForm(key, formData[key]);
    });

    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="mt-6 mb-1 font-semibold text-neutral-700">Job Details</h2>
      <div className="space-y-3 *:space-y-1">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            {...register("title")}
            error={errors?.title?.message}
          />
          <ErrorMessage error={errors?.title?.message} />
        </div>
        <div>
          <Label htmlFor="description">About the job</Label>
          <Textarea
            className="min-h-32"
            id="description"
            {...register("description")}
            error={errors?.description?.message}
          />
          <ErrorMessage error={errors?.description?.message} />
        </div>
        <div>
          <Label htmlFor="address">Job Address</Label>
          <Input
            id="address"
            {...register("address")}
            error={errors?.address?.message}
          />
          <ErrorMessage error={errors?.address?.message} />
        </div>
      </div>

      <h2 className="mt-6 mb-1 font-semibold text-neutral-700">
        Location Type
      </h2>
      <Controller
        name="locationType"
        control={control}
        render={({ field }) => (
          <SelectRadio
            data={data.locationType}
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      />
      <h2 className="mt-6 mb-1 font-semibold text-neutral-700">Job Type</h2>
      <Controller
        name="jobType"
        control={control}
        render={({ field }) => (
          <SelectRadio
            data={data.jobType}
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      />

      <h2 className="mt-6 mb-1 font-semibold text-neutral-700">Compensation</h2>
      <div className="space-y-1">
        <Label htmlFor="salary-type">Salary Type</Label>
        <Controller
          name="salaryType"
          control={control}
          render={({ field }) => (
            <SelectRadio
              data={data.salaryType}
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 *:space-y-1">
        <div>
          <Label htmlFor="minSalary">
            {stepOneForm.salaryType === "single-payment"
              ? "Payment"
              : "Min Salary"}
          </Label>
          <Input
            id="minSalary"
            type="number"
            {...register("minSalary", { valueAsNumber: true })}
            error={errors?.minSalary?.message}
          />
          <ErrorMessage error={errors?.minSalary?.message} />
        </div>
        {stepOneForm.salaryType !== "single-payment" && (
          <div>
            <Label htmlFor="maxSalary">Maximum Salary</Label>
            <Input
              id="maxSalary"
              type="number"
              {...register("maxSalary", { valueAsNumber: true })}
              error={errors?.maxSalary?.message}
            />
            <ErrorMessage error={errors?.maxSalary?.message} />
          </div>
        )}
      </div>

      <div className="flex items-center justify-center py-8 space-x-2">
        <Button
          variant="ghost"
          className="h-12 rounded-lg w-28"
          disabled={true}
        >
          Back
        </Button>
        <Button
          disabled={hasError}
          type="submit"
          className="w-32 h-12 bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
}
