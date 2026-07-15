import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export function useLoginAdmin() {
  const { loginAdmin } = useAuth();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginAdmin(email, password),
  });
}

export function useLoginPassenger() {
  const { loginPassenger } = useAuth();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginPassenger(email, password),
  });
}

export function useRegisterAdmin() {
  const { registerAdmin } = useAuth();
  return useMutation({
    mutationFn: ({
      email,
      password,
      role,
    }: {
      email: string;
      password: string;
      role: "MANAGER" | "STAFF";
    }) => registerAdmin(email, password, role),
  });
}

export function useRegisterPassenger() {
  const { registerPassenger } = useAuth();
  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => registerPassenger(name, email, password),
  });
}
