import { User } from "lucide-react";

export type LucideIconType = typeof User;

export type UserRole = "JobSeeker" | "Recruiter"

export type User = {
  userId: string;
  username: string;
  email: string;
  role: UserRole,
  address?: string,
  phoneNumber?: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  age?: number,
}
