import { Outlet } from "react-router";

import Header from "@/components/Header";

export default function MainLayout() {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-900">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
