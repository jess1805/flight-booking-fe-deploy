import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterPassenger } from "./api/useAuthMutations";
import { PasswordInput } from "../../components/PasswordInput";

const passengerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // gmail.com only
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .refine((val) => /^[^\s@]+@gmail\.com$/i.test(val), {
      message: "Email must be a @gmail.com address",
    }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type PassengerForm = z.infer<typeof passengerSchema>;

const fieldClass =
  "w-full h-11 rounded-xl border border-teal-200 bg-teal-50 px-4 text-slate-900 " +
  "transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

const fieldLabelClass = "mb-2 block text-sm font-semibold text-slate-700";
const fieldErrorClass = "mt-1 text-sm text-red-600";

export function RegisterPage() {
  const navigate = useNavigate();
  const registerPassenger = useRegisterPassenger();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerForm>({ resolver: zodResolver(passengerSchema) });

  async function onSubmit(data: PassengerForm) {
    await registerPassenger.mutateAsync(data);
    navigate("/profile", { replace: true });
  }

  const errorMessage = registerPassenger.isError
    ? (
        registerPassenger.error as AxiosError<{
          error?: { message?: string };
        }>
      ).response?.data?.error?.message ??
      "Couldn't create your account. Please try again."
    : "";

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-10 bg-slate-900 px-4 pt-17">
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] border border-slate-200">
        <h1 className="mb-6 text-center text-3xl font-bold text-slate-900">
          Create an account
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <div>
            <label htmlFor="name" className={fieldLabelClass}>
              Name
            </label>
            <input id="name" {...register("name")} className={fieldClass} />
            {errors.name && <p className={fieldErrorClass}>{errors.name.message}</p>}
          </div>

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
              autoComplete="new-password"
              {...register("password")}
              className={fieldClass}
            />
            {errors.password && (
              <p className={fieldErrorClass}>{errors.password.message}</p>
            )}
          </div>

          {registerPassenger.isError && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={registerPassenger.isPending}
            className="mt-2 rounded-xl bg-teal-600 py-3 font-semibold text-white transition duration-200 hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {registerPassenger.isPending ? "Creating account…" : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-slate-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-teal-700 underline transition hover:text-teal-800"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}