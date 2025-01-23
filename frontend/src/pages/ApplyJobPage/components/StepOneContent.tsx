import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import ErrorMessage from "@/components/ui/ErrorMessage";
import useBoundStore from "@/store";

const StepOneContentSchema = z.object({
  firstName: z.string().min(1, { message: "Required" }),
  lastName: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  phoneNumber: z.string().min(1, { message: "Required" }),
  address: z.string().min(1, { message: "Required" }),
  age: z
    .number({ message: "Invalid Age" })
    .nonnegative()
    .min(1, { message: "Required" }),
});
type StepOneContentSchemaType = z.infer<typeof StepOneContentSchema>;

type StepOneContentProps = {
  nextStep: () => void;
};

export default function StepOneContent({ nextStep }: StepOneContentProps) {
  const stepOneForm = useBoundStore((state) => state.applyJobForm);
  const setStepOneForm = useBoundStore((state) => state.setApplyJobForm);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneContentSchemaType>({
    resolver: zodResolver(StepOneContentSchema),
    defaultValues: {
      firstName: stepOneForm.firstName,
      lastName: stepOneForm.lastName,
      email: stepOneForm.email,
      phoneNumber: stepOneForm.phoneNumber,
      age: stepOneForm.age,
      address: stepOneForm.address,
    },
  });
  const hasError = Object.keys(errors).length > 0;

  const onSubmit: SubmitHandler<StepOneContentSchemaType> = async (
    formData
  ) => {
    //* update global createJobForm state with values of each inputs
    Object.keys(formData).forEach((k) => {
      const key = k as keyof StepOneContentSchemaType;
      setStepOneForm(key, formData[key]);
    });

    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="mb-4 text-3xl font-bold text-neutral-700 ">
        Your Personal Information
      </h1>
      <p className="text-neutral-500">
        Enter your personal information to get closer to companies.
      </p>

      <div className="grid grid-cols-2 gap-6 my-10 *:space-y-1">
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            error={errors?.firstName?.message}
          />
          <ErrorMessage error={errors?.firstName?.message} />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            error={errors?.lastName?.message}
          />
          <ErrorMessage error={errors?.lastName?.message} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            error={errors?.email?.message}
          />
          <ErrorMessage error={errors?.email?.message} />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone #</Label>
          <Input
            id="phoneNumber"
            type="number"
            inputMode="numeric"
            {...register("phoneNumber")}
            error={errors?.phoneNumber?.message}
          />
          <ErrorMessage error={errors?.phoneNumber?.message} />
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            {...register("address")}
            error={errors?.address?.message}
          />
          <ErrorMessage error={errors?.address?.message} />
        </div>
        <div>
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            {...register("age", { valueAsNumber: true })}
            type="number"
            inputMode="numeric"
            error={errors.age?.message}
          />
          <ErrorMessage error={errors.age?.message} />
        </div>
      </div>

      <div className="space-x-2">
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
