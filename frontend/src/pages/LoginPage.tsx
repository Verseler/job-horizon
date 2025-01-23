import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { z } from "zod";

import { useAuth, type LoginFormType } from "@/features/auth";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function LoginPage() {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(LoginSchema) });

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
  });
  const err = error as AxiosError<{ errors: LoginFormType }>;
  const serverErrors = err?.response?.data?.errors;

  const onSubmit: SubmitHandler<LoginFormType> = async (formData) =>
    mutate(formData);

  return (
    <div className="grid min-h-screen place-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 space-y-4 border rounded-lg max-w-80"
      >
        <ErrorMessage
          error={serverErrors?.email || serverErrors?.password}
          center
        />
        <div>
          <Label htmlFor="email">email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            error={errors?.email?.message}
          />
          <ErrorMessage error={errors?.email?.message} />
        </div>
        <div>
          <Label htmlFor="password">password</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            error={errors?.password?.message}
          />
          <ErrorMessage error={errors?.password?.message} />
        </div>
        <Button type="submit" disabled={isPending}>
          Login
        </Button>
      </form>
    </div>
  );
}
