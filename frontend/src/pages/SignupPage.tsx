import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { z } from "zod";

import { useAuth, type SignupFormType } from "@/features/auth";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

const SignupSchema = z.object({
  username: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function SignupPage() {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({ resolver: zodResolver(SignupSchema) });

  const { isPending, error, mutate } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
  });
  const err = error as AxiosError<{ errors: SignupFormType }>;
  const serverErrors = err?.response?.data?.errors;

  const onSubmit: SubmitHandler<SignupFormType> = async (formData) =>
    mutate(formData);

  return (
    <div className="grid min-h-screen place-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 space-y-4 border rounded-lg max-w-80"
      >
        <ErrorMessage
          error={
            serverErrors?.username ||
            serverErrors?.email ||
            serverErrors?.password
          }
          center
        />
        <div>
          <Label htmlFor="userName">username</Label>
          <Input
            id="userName"
            {...register("username")}
            error={errors?.username?.message}
          />
          <ErrorMessage error={errors?.username?.message} />
        </div>

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
          Register
        </Button>
      </form>
    </div>
  );
}
