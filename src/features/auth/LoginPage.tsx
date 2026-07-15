import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginAdmin, useLoginPassenger } from "./api/useAuthMutations";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  // const location = useLocation();
  const [audience, setAudience] = useState<"PASSENGER" | "ADMIN">("PASSENGER");

  const loginAdmin = useLoginAdmin();
  const loginPassenger = useLoginPassenger();
  const activeMutation = audience === "ADMIN" ? loginAdmin : loginPassenger;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginForm) {
    await activeMutation.mutateAsync(data);
    if (audience === "PASSENGER") {
        navigate("/profile", { replace: true });    
      } else {
        navigate("/admin", { replace: true });
      }
  }

  const errorMessage =
  activeMutation.isError
    ? (
        activeMutation.error as AxiosError<{
          error?: { message?: string };
        }>
      ).response?.data?.error?.message ?? "Unable to log in. Please try again."
    : "";

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-sm flex-col justify-center px-4">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">Log in</h1>

      {/* audience tabs — admin and passenger use separate login endpoints */}
      <div className="mb-6 flex rounded-md border border-slate-300 p-1 text-sm">
        <button
          type="button"
          onClick={() => setAudience("PASSENGER")}
          className={
            "flex-1 rounded px-3 py-1.5 " +
            (audience === "PASSENGER" ? "bg-slate-900 text-white" : "text-slate-600")
          }
        >
          Passenger
        </button>
        <button
          type="button"
          onClick={() => setAudience("ADMIN")}
          className={
            "flex-1 rounded px-3 py-1.5 " +
            (audience === "ADMIN" ? "bg-slate-900 text-white" : "text-slate-600")
          }
        >
          Airline staff
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register("email")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {activeMutation.isError && (
          <p className="text-sm text-red-600">
            {errorMessage}
          </p>
          )}

        <button
          type="submit"
          disabled={activeMutation.isPending}
          className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
        >
          {activeMutation.isPending ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        No account?{" "}
        <Link to="/register" className="font-medium text-slate-900 underline">
          Register
        </Link>
      </p>
    </div>
  );
}
