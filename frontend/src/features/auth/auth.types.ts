import type { UserRole } from "@/types";

export type LoginFormType = {
  email: string;
  password: string;
};

export type SignupFormType = {
  username: string;
  email: string;
  password: string;
  role: UserRole;
};