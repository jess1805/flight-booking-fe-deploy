import { Link } from "react-router-dom";
import { useFlights } from "../flights/api/useFlights";
import { useAuth } from "../auth/context/AuthContext";
import { GateForm } from "./components/GateForm";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";

export function AdminDashboardPage() {
  const { user } = useAuth();
  const { data, isLoading, isError } = useFlights({ limit: 50 });
  const flights = data?.data;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Flights</h1>

      {isLoading && <LoadingState label="Loading flights…" />}
      {isError && <ErrorState label="Couldn't load flights." />}
      {!isLoading && !isError && flights?.length === 0 && (
        <EmptyState label="No flights found." />
      )}

      {!isLoading && !isError && flights && flights.length > 0 && (
        <ul className="flex flex-col gap-3">
          {flights.map((flight) => (
            <li
              key={flight.id}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">
                  {flight.airline} · {flight.flightNumber}
                </p>
                <p className="text-sm text-slate-500">
                  {flight.origin} → {flight.destination}
                  {flight.gate ? ` · Gate ${flight.gate}` : " · No gate assigned"}
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 sm:items-end">
                {/* gate updates are Manager-only per the API */}
                {user?.role === "MANAGER" && (
                  <GateForm flightId={flight.id} currentGate={flight.gate} />
                )}
                <Link
                  to={`/admin/flights/${flight.id}/bookings`}
                  className="text-sm font-medium text-slate-900 underline"
                >
                  View bookings
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
