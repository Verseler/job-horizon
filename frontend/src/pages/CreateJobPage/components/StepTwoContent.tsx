import { CircleCheck, Plus, X } from "lucide-react";
import { useState } from "react";

import ErrorMessage from "@/components/ui/ErrorMessage";
import { removeFalsyElements } from "@/features/job";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import useBoundStore from "@/store";

type FieldType = "skills" | "qualifications";

type StepTwoContentProps = {
  nextStep: () => void;
  prevStep: () => void;
};

export default function StepTwoContent({
  nextStep,
  prevStep,
}: StepTwoContentProps) {
  const stepTwoForm = useBoundStore((state) => state.createJobForm);
  const setStepTwoForm = useBoundStore((state) => state.setCreateJobForm);

  const [errors, setErrors] = useState({ skills: "", qualifications: "" });
  const hasErrors = Boolean(errors.qualifications || errors.skills);

  function handleCreateField(type: FieldType) {
    const newFieldValue = "";
    const prevFieldValues = stepTwoForm[type];
    const updatedFieldValues = [...prevFieldValues, newFieldValue];

    setStepTwoForm(type, updatedFieldValues);
  }

  function handleDeleteField(index: number, type: FieldType) {
    if (stepTwoForm[type].length <= 1) return; //prevent deleting last field

    const updatedFieldValues = [...stepTwoForm[type]];
    updatedFieldValues.splice(index, 1); //remove selected field

    checkIfThereIsDuplications(updatedFieldValues, type);
    setStepTwoForm(type, updatedFieldValues);
  }

  function handleOnChange(value: string, index: number, type: FieldType) {
    const updatedFieldValues = [...stepTwoForm[type]];
    updatedFieldValues[index] = value; //update selected field

    checkIfThereIsDuplications(updatedFieldValues, type);
    setStepTwoForm(type, updatedFieldValues);
  }

  function checkIfThereIsDuplications(array: any, type: FieldType) {
    setErrors((prevErrors) => ({ ...prevErrors, [type]: "" }));

    const thereIsDuplication = new Set(array).size !== array?.length;

    if (!thereIsDuplication) return;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [type]: "Duplicate values",
    }));
  }

  function handleNextStep() {
    if (hasErrors) return;

    //* Cleanup falsy values for skills and qualifications by removing them
    let updatedStepTwoFrom = { ...stepTwoForm };
    updatedStepTwoFrom.skills = removeFalsyElements(updatedStepTwoFrom.skills);
    setStepTwoForm("skills", updatedStepTwoFrom["skills"]);
    
    updatedStepTwoFrom.qualifications = removeFalsyElements(
      updatedStepTwoFrom.qualifications
    );
    setStepTwoForm("qualifications", updatedStepTwoFrom["qualifications"]);

    nextStep();
  }

  return (
    <>
      <h2 className="mt-5 mb-1.5 font-semibold text-neutral-700">Skills</h2>
      <ul className="space-y-2">
        {stepTwoForm.skills?.map((skill, index) => (
          <ListField
            key={index}
            value={skill}
            onChange={(e) => handleOnChange(e.target.value, index, "skills")}
            onItemDelete={() => handleDeleteField(index, "skills")}
            error={errors.skills}
          />
        ))}
        <ErrorMessage error={errors.skills} className="mx-12" />
      </ul>
      <Button
        onClick={() => handleCreateField("skills")}
        variant="outline"
        className="mt-4 font-semibold ms-10"
      >
        <Plus />
        Add Skill
      </Button>

      <h2 className="mt-10 mb-1.5 font-medium text-neutral-700">
        Qualifications
      </h2>
      <ul className="space-y-2">
        {stepTwoForm.qualifications?.map((qualification, index) => (
          <ListField
            key={index}
            value={qualification}
            onChange={(e) =>
              handleOnChange(e.target.value, index, "qualifications")
            }
            onItemDelete={() => handleDeleteField(index, "qualifications")}
            error={errors.qualifications}
          />
        ))}
        <ErrorMessage error={errors.qualifications} className="mx-12" />
      </ul>
      <Button
        onClick={() => handleCreateField("qualifications")}
        variant="outline"
        className="mt-4 font-medium ms-10"
      >
        <Plus />
        Add Qualification
      </Button>

      <div className="flex items-center justify-center py-8 space-x-2">
        <Button
          onClick={prevStep}
          variant="ghost"
          className="h-12 rounded-lg w-28"
        >
          Back
        </Button>
        <Button
          disabled={hasErrors}
          onClick={handleNextStep}
          className="w-32 h-12 bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
        >
          Next Step
        </Button>
      </div>
    </>
  );
}

type ListFieldProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onItemDelete: () => void;
  error?: string;
};

function ListField({ onChange, value, onItemDelete, error }: ListFieldProps) {
  return (
    <li className="flex items-center gap-x-0.5">
      <div className="px-2">
        <CircleCheck className="size-6 min-w-6" fill="#3b82f6" color="white" />
      </div>
      <Input value={value} onChange={onChange} error={error} />
      <Button
        size="icon"
        variant="link"
        className="transition-colors hover:text-red-600"
        onClick={onItemDelete}
      >
        <X />
      </Button>
    </li>
  );
}
