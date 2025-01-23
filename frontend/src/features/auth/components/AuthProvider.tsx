import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";

import type { LoginFormType, SignupFormType } from "@/features/auth";
import type { User, UserRole } from "@/types";

type TAuthContext = {
  token: string;
  user: User | null;
  userId: string | null;
  login: (form: LoginFormType) => Promise<void>;
  signup: (form: SignupFormType) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<TAuthContext>({
  token: "",
  user: null,
  userId: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(
    JSON.parse(Cookies.get("user") || "{}") || null
  );
  const userId: string | null = user?.userId ?? null;
  const [token, setToken] = useState<string>(Cookies.get("jwtToken") || "");

  const login = async (form: LoginFormType) => {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`, form)
      .then((res) => {
        const user: User = res?.data?.userMetaData;
        const userRole: UserRole = user?.role;
        const jwtToken: string = res.data?.token;

        setUser(user);
        setToken(jwtToken);
        Cookies.set("user", JSON.stringify(user));
        Cookies.set("jwtToken", jwtToken);

        if (userRole === "JobSeeker") {
          navigate("/find-jobs");
          return;
        }
        navigate("/my-job-posts");
        return;
      })
      .catch((err) => {
        throw err;
      });
  };

  const signup = async (form: SignupFormType) => {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`, form)
      .then((res) => {
        const user: User = res?.data?.userMetaData;
        const userRole: UserRole = user?.role;
        const jwtToken: string = res.data?.token;

        setUser(user);
        setToken(jwtToken);
        Cookies.set("user", JSON.stringify(user));
        Cookies.set("jwtToken", jwtToken);

        if (userRole === "JobSeeker") {
          navigate("/find-jobs");
          return;
        }
        navigate("/my-job-posts");
        return;
      })
      .catch((err) => {
        throw err;
      });
  };

  const logout = () => {
    setUser(null);
    setToken("");
    Cookies.remove("user");
    Cookies.remove("jwtToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, userId, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
