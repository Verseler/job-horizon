import { AxiosError } from "axios";
import { useNavigate } from "react-router";

import useBoundStore from "@/store";
import { Button } from "@/components/ui/Button";
import { createJob } from "@/features/job/jobApi";
import { useToast } from "@/hooks/use-toast";

type StepThreeContentProps = {
  prevStep: () => void;
  recruiterId: string
};

export default function StepThreeContent({ prevStep, recruiterId }: StepThreeContentProps) {
  const createJobForm = useBoundStore((state) => state.createJobForm);
  const resetCreateJobForm = useBoundStore((state) => state.resetCreateJobForm);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await createJob({...createJobForm, recruiterId: recruiterId})
      .then((_) => {
        toast({
          title: "Job Created Successfully",
          duration: 3000,
        });
        resetCreateJobForm();
        navigate("/my-job-posts");
      })
      .catch((err) => {
        console.log("step 3: create job submission error: ", err);
        const error = err as AxiosError<{ errors: { message: string } }>;
        const errorMessage = error.response?.data?.errors?.message;
        toast({
          title: errorMessage,
          description: "There is an error in the form fields",
          variant: "destructive",
        });
      });
  };

  return (
    <div>
      <h1>Awata lang ang content sa job full view</h1>

      <div className="flex items-center justify-center py-8 space-x-2">
        <Button
          onClick={prevStep}
          variant="ghost"
          className="h-12 rounded-lg w-28"
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="w-32 h-12 bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
