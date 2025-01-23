import { Separator } from "@/components/ui/Separator";
import type { Step } from "@/features/job";

export default function StepHeader({ label, number }: Step) {
  return (
    <div>
      <p className="text-sm font-medium text-neutral-500">Step {number}</p>
      <h1 className="text-xl font-bold">{label}</h1>
      <Separator className="my-5" />
    </div>
  );
}
