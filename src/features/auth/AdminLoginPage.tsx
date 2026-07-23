import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useLoginAdmin } from "./api/useAuthMutations";
import { PasswordInput } from "../../components/PasswordInput";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const fieldClass =
  "w-full h-11 rounded-xl border border-teal-200 bg-teal-50 px-4 text-slate-900 " +
  "transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

const fieldLabelClass = "mb-2 block text-sm font-semibold text-slate-700";
const fieldErrorClass = "mt-1 text-sm text-red-600";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const loginAdmin = useLoginAdmin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginForm) {
    await loginAdmin.mutateAsync(data);
    navigate("/admin/flights", { replace: true });
  }

  const errorMessage = loginAdmin.isError
    ? (
        loginAdmin.error as AxiosError<{
          error?: { message?: string };
        }>
      ).response?.data?.error?.message ?? "Unable to log in. Please try again."
    : "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-10 bg-slate-900 px-4 pt-20">
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-slate-200">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
          Admin log in
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <div>
            <label htmlFor="email" className={fieldLabelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className={fieldClass}
            />
            {errors.email && <p className={fieldErrorClass}>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className={fieldLabelClass}>
              Password
            </label>
            <PasswordInput
              id="password"
              autoComplete="current-password"
              {...register("password")}
              className={fieldClass}
            />
            {errors.password && (
              <p className={fieldErrorClass}>{errors.password.message}</p>
            )}
          </div>

          {loginAdmin.isError && <p className="text-sm text-red-600">{errorMessage}</p>}

          <button
            type="submit"
            disabled={loginAdmin.isPending}
            className="mt-2 rounded-xl bg-teal-600 py-3 font-semibold text-white transition duration-200 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loginAdmin.isPending ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}