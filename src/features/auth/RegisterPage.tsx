import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterAdmin, useRegisterPassenger } from "./api/useAuthMutations";

const passengerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const adminSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["MANAGER", "STAFF"]),
});

type PassengerForm = z.infer<typeof passengerSchema>;
type AdminForm = z.infer<typeof adminSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const [audience, setAudience] = useState<"PASSENGER" | "ADMIN">("PASSENGER");

  return (
    <div className="mx-auto flex min-h-[80vh] w-full max-w-sm flex-col justify-center px-4">
      <h1 className="mb-4 text-2xl font-semibold text-slate-900">Create an account</h1>

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

      {audience === "PASSENGER" ? (
        <PassengerRegisterForm onDone={() => navigate("/profile", { replace: true })} />
      ) : (
        <AdminRegisterForm onDone={() => navigate("/admin", { replace: true })} />
      )}

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-slate-900 underline">
          Log in
        </Link>
      </p>
    </div>
  );
}

function PassengerRegisterForm({ onDone }: { onDone: () => void }) {
  const registerPassenger = useRegisterPassenger();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PassengerForm>({ resolver: zodResolver(passengerSchema) });

  async function onSubmit(data: PassengerForm) {
    await registerPassenger.mutateAsync(data);
    onDone();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Name</label>
        <input
          {...register("name")}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          autoComplete="new-password"
          {...register("password")}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {registerPassenger.isError && (
        <p className="text-sm text-red-600">Couldn't create your account. Try a different email.</p>
      )}

      <button
        type="submit"
        disabled={registerPassenger.isPending}
        className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {registerPassenger.isPending ? "Creating account…" : "Register"}
      </button>
    </form>
  );
}

function AdminRegisterForm({ onDone }: { onDone: () => void }) {
  const registerAdmin = useRegisterAdmin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminForm>({ resolver: zodResolver(adminSchema), defaultValues: { role: "STAFF" } });

  async function onSubmit(data: AdminForm) {
    await registerAdmin.mutateAsync(data);
    onDone();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Password</label>
        <input
          type="password"
          autoComplete="new-password"
          {...register("password")}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Role</label>
        <select
          {...register("role")}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="STAFF">Staff</option>
          <option value="MANAGER">Manager</option>
        </select>
      </div>

      {registerAdmin.isError && (
        <p className="text-sm text-red-600">Couldn't create the account. Try a different email.</p>
      )}

      <button
        type="submit"
        disabled={registerAdmin.isPending}
        className="mt-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
      >
        {registerAdmin.isPending ? "Creating account…" : "Register"}
      </button>
    </form>
  );
}
