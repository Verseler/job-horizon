import React from "react";

import StepHeader from "@/pages/CreateJobPage/components/StepHeader";
import { type Step } from "@/features/job";
import { cn } from "@/lib/utils";

const stepsInfo: Array<Step> = [
  { number: 1, label: "General Info" },
  { number: 2, label: "Skills & Qualifications" },
  { number: 3, label: "Preview & Submit" },
];

type StepsInfoProps = {
  currentStep: number;
};

export default function StepsInfo({ currentStep }: StepsInfoProps) {
  return (
    <>
      <div className="flex items-center justify-center py-10">
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

      <StepHeader
        number={currentStep}
        label={stepsInfo[currentStep - 1].label}
      />
    </>
  );
}

type StepInfoProps = {
  step: Step;
  active: boolean;
};

export function StepInfo({ step, active }: StepInfoProps) {
  const ifNotFirstStep = step.number > 1;

  const stepActiveStyle = active
    ? "border-green-600 text-neutral-900"
    : "border-neutral-400/20 text-neutral-400";

  return (
    <>
      {ifNotFirstStep && <LineSeparator active={active} />}
      <div
        className={cn(
          "flex items-center ps-2 pe-3 py-1.5 border-2 font-medium max-w-max gap-x-1.5 rounded-3xl",
          stepActiveStyle
        )}
      >
        <StepNumber active={active}>{step.number}</StepNumber>
        <p className="text-xs">{step.label}</p>
      </div>
    </>
  );
}

function LineSeparator({ active }: Pick<StepInfoProps, "active">) {
  return (
    <div
      className={cn(
        "flex-1 h-0.5",
        active ? "bg-green-600" : "bg-neutral-400/20"
      )}
    />
  );
}

type StepNumberProps = {
  active: boolean;
  children: React.ReactNode;
};

function StepNumber({ active, children }: StepNumberProps) {
  return (
    <div
      className={cn(
        "text-[0.55rem] flex justify-center border-2 rounded-full size-4",
        active ? "border-green-600" : "border-neutral-400/30"
      )}
    >
      {children}
    </div>
  );
}
