import { NavLink } from "react-router";
import { Bell } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import CenterContainer from "@/components/ui/CenterContainer";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/features/auth";
import { getInitial } from "@/lib/utils";

const jobSeekerNavLinks = [
  { id: 1, label: "Find Jobs", path: "find-jobs" },
  { id: 2, label: "My Jobs", path: "my-jobs" },
];

export default function Header() {
  const { logout, user } = useAuth();
  const userRole = user?.role;

  const firstName = user?.firstName ?? "";
  const userName = user?.username ?? "";
  const nameInitial = firstName ? getInitial(firstName) : getInitial(userName);

  const navLinks =
    userRole === "JobSeeker" &&
    jobSeekerNavLinks.map((link) => (
      <li key={link.id}>
        <NavLink
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "text-green-600 border-b-2 border-b-green-600 py-4"
              : "text-slate-500"
          }
        >
          {link.label}
        </NavLink>
      </li>
    ));

  return (
    <div className="py-2 border-b bg-slate-50 dark:bg-slate-900 border-b-neutral-200">
      <CenterContainer className="flex items-center justify-between">
        {/*TODO: change temporary logo */}
        <div className="flex items-center gap-x-2">
          <div className="px-1 font-semibold text-white bg-green-600 rounded-sm">
            JH
          </div>
          <span className="font-semibold">Job Horizon</span>
        </div>

        <ul className="flex items-center text-sm font-semibold gap-x-6">
          {navLinks}
        </ul>

        <div className="flex items-center gap-x-3">
          <Button size="icon" variant="ghost" className="text-slate-500">
            <Bell />
          </Button>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{nameInitial}</AvatarFallback>
          </Avatar>

          <Button onClick={logout}>Logout</Button>
        </div>
      </CenterContainer>
    </div>
  );
}
