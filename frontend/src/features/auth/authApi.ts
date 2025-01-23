import axios from "axios"
import { LoginFormType, SignupFormType } from "@/features/auth/auth.types";

export const login = (form: LoginFormType) =>  axios
.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`, form);

export const signup = (form: SignupFormType) => {
  axios.defaults.withCredentials = true;
  return axios
  .post(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`, form)
}
