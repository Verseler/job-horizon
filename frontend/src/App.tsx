import { Route, Routes } from "react-router";

import MainLayout from "@/components/MainLayout";
import { Toaster } from "@/components/ui/Toaster";
import { RoleProtectedRoute } from "@/features/auth";
import CreateJobPage from "@/pages/CreateJobPage/CreateJobPage";
import ApplyJobPage from "@/pages/ApplyJobPage/ApplyJobPage";
import MyJobPostsPage from "@/pages/MyJobPostsPage";
import FindJobsPage from "@/pages/FindJobsPage";
import LandingPage from "@/pages/LandingPage";
import SignupPage from "@/pages/SignupPage";
import MyJobsPage from "@/pages/MyJobsPage";
import LoginPage from "@/pages/LoginPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route element={<RoleProtectedRoute allowedRoles={["JobSeeker"]} />}>
          <Route element={<MainLayout />}>
            <Route path="find-jobs" element={<FindJobsPage />} />
            <Route path="apply-job" element={<ApplyJobPage />} />
            <Route path="my-jobs" element={<MyJobsPage />} />
          </Route>
        </Route>

        <Route element={<RoleProtectedRoute allowedRoles={["Recruiter"]} />}>
          <Route element={<MainLayout />}>
            <Route path="my-job-posts" element={<MyJobPostsPage />} />
            <Route path="create-job" element={<CreateJobPage />} />
          </Route>
        </Route>

        {/* <Route path="/not-found" element={} />
        <Route path="*" element={} /> */}
      </Routes>
      <Toaster />
    </>
  );
}
