import { useState } from "react";

import StepsInfo from "@/pages/CreateJobPage/components/StepsInfo";
import StepOneContent from "@/pages/CreateJobPage/components/StepOneContent";
import StepTwoContent from "@/pages/CreateJobPage/components/StepTwoContent";
import StepThreeContent from "@/pages/CreateJobPage/components/StepThreeContent";
import { useAuth } from "@/features/auth";

export default function CreateJobPage() {
  const {userId} = useAuth();
  if(!userId) return;

  const [currentStep, setCurrentStep] = useState(1);
  const prevStep = () => setCurrentStep((step) => step - 1);
  const nextStep = () => setCurrentStep((step) => step + 1);

  const currentStepContent = () => {
    switch (currentStep) {
      case 3:
        return <StepThreeContent prevStep={prevStep} recruiterId={userId} />;
      case 2:
        return <StepTwoContent nextStep={nextStep} prevStep={prevStep} />;
      case 1:
      default:
        return <StepOneContent nextStep={nextStep} />;
    }
  };

  return (
    <div className="max-w-3xl px-4 py-6 mx-auto md:p-12">
      <div className="space-y-1 text-center">
        <h1 className="text-2xl font-bold xl:text-3xl">Create Job</h1>
        <p className="text-sm text-slate-500">
          Create the job with this guided process
        </p>
      </div>
      <StepsInfo currentStep={currentStep} />
      <div className="min-h-96">{currentStepContent()}</div>
    </div>
  );
}
