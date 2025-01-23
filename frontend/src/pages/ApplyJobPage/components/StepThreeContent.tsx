import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { applyJob } from "@/features/job/jobApi";
import { useToast } from "@/hooks/use-toast";
import useBoundStore from "@/store";
import { AxiosError } from "axios";
import { Link, Plus, Tag, Trash } from "lucide-react";
import { useNavigate } from "react-router";

type StepThreeContentProps = {
  prevStep: () => void;
  jobId: string;
  jobSeekerId: string;
};

export default function StepThreeContent({
  prevStep,
  jobId,
  jobSeekerId,
}: StepThreeContentProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const stepThreeForm = useBoundStore((state) => state.applyJobForm);
  const setStepThreeForm = useBoundStore((state) => state.setApplyJobForm);
  const resetStepThreeForm = useBoundStore((state) => state.resetApplyJobForm);

  function handleCreateField() {
    const newFieldValue = { label: "", value: "" };
    const prevFieldValues = stepThreeForm["additionalInfo"];
    const updatedFieldValues = [...prevFieldValues, newFieldValue];

    setStepThreeForm("additionalInfo", updatedFieldValues);
  }

  function handleDeleteField(index: number) {
    if (stepThreeForm["additionalInfo"].length <= 1) return; //prevent deleting last field

    const updatedFieldValues = [...stepThreeForm["additionalInfo"]];
    updatedFieldValues.splice(index, 1); //remove selected field

    setStepThreeForm("additionalInfo", updatedFieldValues);
  }

  function handleOnChange(
    value: string,
    index: number,
    type: "label" | "value"
  ) {
    const updatedFieldValues = [...stepThreeForm["additionalInfo"]];
    updatedFieldValues[index][type] = value; //update selected field

    setStepThreeForm("additionalInfo", updatedFieldValues);
  }

  async function handleSubmit() {
    //* Cleanup false values
    let updatedStepThreeForm = { ...stepThreeForm };
    updatedStepThreeForm.additionalInfo =
      updatedStepThreeForm.additionalInfo.filter(
        (link) => link.label || link.value
      );
    setStepThreeForm("additionalInfo", updatedStepThreeForm.additionalInfo);

    //* format form data (stringify arrays, and format document files)
    const data = new FormData();
    data.append("jobId", jobId);
    data.append("jobSeekerId", jobSeekerId);
    console.log("stepthree ", data);
    Object.entries(updatedStepThreeForm).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value as string);
      }
    });

    await applyJob(data)
      .then((_) => {
        toast({
          title: "Successfully Applied to Job",
          duration: 3000,
        });
        resetStepThreeForm();
        navigate("/find-jobs");
      })
      .catch((err) => {
        console.log("step 3: apply job submission error: ", err);
        const error = err as AxiosError<{ errors: { message: string } }>;
        const errorMessage = error.response?.data?.errors?.message;
        toast({
          title: errorMessage,
          description: "There is an error in the form fields",
          variant: "destructive",
        });
      });
  }

  return (
    <>
      <h1 className="mb-4 text-3xl font-bold text-neutral-700 ">
        Additional Information Links
      </h1>
      <p className="text-neutral-500">
        Add certifications or portfolio links to showcase your expertise.
      </p>
      <p className="italic text-neutral-500">
        Certifications / Portfolio Links
      </p>

      <div className="my-6 space-y-3 min-h-60 max-w-[44rem]">
        {stepThreeForm["additionalInfo"]?.map((link, index) => (
          <ListField
            key={index}
            label={link.label}
            onLabelChange={(e) =>
              handleOnChange(e.target.value, index, "label")
            }
            value={link.value}
            onValueChange={(e) =>
              handleOnChange(e.target.value, index, "value")
            }
            onItemDelete={() => handleDeleteField(index)}
          />
        ))}

        <div className="flex flex-1 gap-x-2 pe-11">
          <Button
            onClick={handleCreateField}
            variant="outline"
            className="w-full font-medium"
          >
            <Plus />
            Add Link
          </Button>
        </div>
      </div>

      <div className="space-x-2">
        <Button
          variant="ghost"
          className="h-12 rounded-lg w-28"
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-32 h-12 bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
        >
          Next Step
        </Button>
      </div>
    </>
  );
}

type ListFieldProps = {
  label: string;
  value: string;
  onLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemDelete: () => void;
  error?: string;
};

function ListField({
  onLabelChange,
  label,
  onValueChange,
  value,
  onItemDelete,
  error,
}: ListFieldProps) {
  return (
    <div className="flex gap-x-2">
      <div className="relative">
        <Tag className="absolute size-4 top-2.5 start-2.5 text-neutral-500" />
        <Input
          value={label}
          onChange={onLabelChange}
          error={error}
          className="w-60 ps-8"
        />
      </div>
      <div className="relative flex-1">
        <Link className="absolute size-4 top-2.5 start-2.5 text-neutral-500" />
        <Input
          value={value}
          onChange={onValueChange}
          error={error}
          className="ps-8 text-neutral-500"
        />
      </div>
      <Button
        variant="link"
        size="icon"
        className="text-red-600 hover:text-red-700"
        onClick={onItemDelete}
      >
        <Trash />
      </Button>
    </div>
  );
}
