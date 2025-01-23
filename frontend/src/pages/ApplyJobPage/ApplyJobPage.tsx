import { useState } from "react";
import { useLocation } from "react-router";

import StepsInfo from "@/pages/ApplyJobPage/components/StepsInfo";
import StepThreeContent from "@/pages/ApplyJobPage/components/StepThreeContent";
import StepTwoContent from "@/pages/ApplyJobPage/components/StepTwoContent";
import StepOneContent from "@/pages/ApplyJobPage/components/StepOneContent";
import { useAuth } from "@/features/auth";

type LocationState = {
  jobId: string | null | undefined;
};

export default function ApplyJobPage() {
  const location = useLocation();
  const jobId = (location.state as LocationState)?.jobId;
  const { userId } = useAuth();
  if (!jobId || !userId) return;

  const [currentStep, setCurrentStep] = useState(2); //!temp
  const prevStep = () => setCurrentStep((step) => step - 1);
  const nextStep = () => setCurrentStep((step) => step + 1);

  const currentStepContent = () => {
    switch (currentStep) {
      case 3:
        return (
          <StepThreeContent
            prevStep={prevStep}
            jobId={jobId}
            jobSeekerId={userId}
          />
        );
      case 2:
        return <StepTwoContent nextStep={nextStep} prevStep={prevStep} />;
      case 1:
      default:
        return <StepOneContent nextStep={nextStep} />;
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-57px)]">
      <div className="flex flex-col justify-center p-10 text-white bg-green-900 w-96 pe-14">
        <StepsInfo currentStep={currentStep} />
      </div>

      <div className="flex flex-col justify-center flex-1 max-w-4xl p-10">
        <div className=" min-h-[26rem]">{currentStepContent()}</div>
      </div>
    </div>
  );
}
