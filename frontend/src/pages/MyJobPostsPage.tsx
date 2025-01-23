import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router";

export default function MyJobPostsPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>My Job Posts - Employer</h1>
      <Button onClick={() => navigate("/create-job")}>Create Job</Button>
    </div>
  );
}
