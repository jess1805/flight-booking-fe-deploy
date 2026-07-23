import { useState } from "react";
import { Link } from "react-router-dom";
import { useFlights } from "../flights/api/useFlights";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";
import { ArrowRight, Plane, DoorOpen } from "lucide-react";

export function FlightsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useFlights({ page, limit: 10 });
  const flights = data?.data;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-10">
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        {/* header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600">
            <Plane size={26} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Flights</h1>
        </div>

        {isLoading && <LoadingState label="Loading flights…" />}
        {isError && <ErrorState label="Couldn't load flights." />}
        {!isLoading && !isError && flights?.length === 0 && (
          <EmptyState label="No flights found." />
        )}

        {!isLoading && !isError && flights && flights.length > 0 && (
          <>
            <ul className="flex flex-col gap-4">
              {flights.map((flight) => (
                <li
                  key={flight.id}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-lg sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-bold text-slate-900">
                      {flight.airline}
                    </p>
                    <p className="text-sm text-teal-600">{flight.flightNumber}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(flight.departureTime).toLocaleDateString([], {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-1 items-center gap-3 sm:mx-6">
                    <span className="rounded-lg bg-teal-50 px-4 py-2 text-xl font-bold text-teal-700">
                      {flight.origin}
                    </span>
                    <div className="flex flex-1 items-center gap-2 text-teal-500">
                      <span className="h-px flex-1 bg-teal-200" />
                      <ArrowRight size={20} />
                      <span className="h-px flex-1 bg-teal-200" />
                    </div>
                    <span className="rounded-lg bg-teal-50 px-4 py-2 text-xl font-bold text-teal-700">
                      {flight.destination}
                    </span>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-3">
  {flight.gate && (
    <div className="flex items-center gap-1.5 text-slate-700">
      <DoorOpen size={18} className="text-teal-600" />
      <div className="text-sm">
        <span className="block text-slate-400 leading-none">Gate</span>
        <span className="font-semibold">{flight.gate}</span>
      </div>
    </div>
  )}

  <Link
    to={`/admin/flights/${flight.id}/bookings`}
    className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 active:bg-teal-800"
  >
    View bookings
  </Link>
</div>
                </li>
              ))}
            </ul>

            {data && data.pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between text-sm">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-lg bg-teal-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-teal-700 active:bg-teal-800 disabled:opacity-40"
                >
                  Previous
                </button>
                <span className="text-slate-300">
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                  disabled={page >= data.pagination.totalPages}
                  className="rounded-lg bg-teal-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-teal-700 active:bg-teal-800 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* footer line */}
        <div className="mt-10 flex items-center justify-center gap-2 text-teal-500">
          <Plane size={16} />
          <span className="text-sm">Browse all flights and manage their bookings.</span>
        </div>
      </div>
    </div>
  );
}