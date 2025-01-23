import { cn } from "@/lib/utils";
import { Step } from "@/features/job";

const stepsInfo: Array<Step> = [
  {
    number: 1,
    label: "Personal Information",
    description: " Enter your personal information to get closer to companies.",
  },
  {
    number: 2,
    label: "Documents",
    description: "Upload the required documents.",
  },
  {
    number: 3,
    label: "Additional Information",
    description: "Provide your Certifications or Portfolio links",
  },
];

type StepsInfoProps = {
  currentStep: number;
};

export default function StepsInfo({ currentStep }: StepsInfoProps) {
  const currentStepInfo =
    stepsInfo.find((step) => step.number === currentStep) || stepsInfo[0];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">
        Step {currentStepInfo?.number}
      </h1>
      <p className="text-neutral-20 h-14">{currentStepInfo?.description}</p>

      <div className="space-y-3 py-14 text-neutral-200">
        {stepsInfo.map((step) => {
          const isUnderCurrentStep = currentStep >= step.number;

          return (
            <StepInfo
              key={step.number}
              step={step}
              active={isUnderCurrentStep}
            />
          );
        })}
      </div>
    </div>
  );
}

type StepInfoProps = {
  step: Step;
  active: boolean;
};

function StepInfo({ step, active }: StepInfoProps) {
  const ifNotFirstStep = step.number > 1;

  return (
    <>
      {ifNotFirstStep && <BreakLineSeparator active={active} />}
      <div
        key={step.number}
        className={cn(
          "flex items-center gap-x-4",
          active ? "text-white" : "text-white/30"
        )}
      >
        <div
          className={cn(
            "grid text-sm font-semibold border rounded-full place-content-center size-7",
            active ? "border-white" : "border-white/30"
          )}
        >
          {step.number}
        </div>
        <p className="mb-1">{step.label}</p>
      </div>
    </>
  );
}

function BreakLineSeparator({ active }: Pick<StepInfoProps, "active">) {
  const SIZE = 5;

  return (
    <div className="flex flex-col items-center w-7 gap-y-1">
      {Array.from({ length: SIZE }).map((_, index) => (
        <div
          key={index}
          className={cn("w-0.5 h-1 ", active ? "bg-white" : "bg-white/30")}
        />
      ))}
    </div>
  );
}
