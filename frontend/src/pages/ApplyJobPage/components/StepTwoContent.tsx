import React, { useState } from "react";

import { Button } from "@/components/ui/Button";
import Uploader from "@/components/ui/Uploader";
import useBoundStore from "@/store";

type StepTwoContentProps = {
  nextStep: () => void;
  prevStep: () => void;
};

export default function StepTwoContent({
  nextStep,
  prevStep,
}: StepTwoContentProps) {
  const stepTwoForm = useBoundStore((state) => state.applyJobForm);
  const setStepTwoForm = useBoundStore((state) => state.setApplyJobForm);
  const [files, setFiles] = useState<Array<File>>(stepTwoForm.documents);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setStepTwoForm("documents", files);
    nextStep();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-4 text-3xl font-bold text-neutral-700 ">
        Your Documents
      </h1>
      <p className="text-neutral-500">
        Provide the required documents based on the job descriptions.
      </p>
      <p className="italic text-neutral-500">RESUME / CV / Cover Letter</p>
      <div className="my-6 space-y-3 w-[36rem]">
        <Uploader files={files} setFiles={setFiles} />
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
          type="submit"
          className="w-32 h-12 bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
        >
          Next Step
        </Button>
      </div>
    </form>
  );
}
