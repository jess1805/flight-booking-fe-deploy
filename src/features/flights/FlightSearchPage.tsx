import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Calendar, DoorOpen } from "lucide-react";
import { useFlights } from "./api/useFlights";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";

// Same teal-tinted field style used on the login/register inputs, so the
// search boxes on this page look consistent with the rest of the app.
const fieldClass =
  "w-full h-11 rounded-xl border border-teal-200 bg-teal-50 pl-10 pr-3 text-sm text-slate-900 " +
  "transition placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200";

// Wraps an input with a small icon on the left (origin pin, destination
// pin, calendar) — purely decorative, doesn't affect the input's value.
function FieldWithIcon({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-teal-600">
        {icon}
      </span>
      {children}
    </div>
  );
}

export function FlightSearchPage() {
  const [page, setPage] = useState(1);
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const { data, isLoading, isError } = useFlights({
    origin: origin || undefined,
    destination: destination || undefined,
    departureDate: departureDate || undefined,
    page,
    limit: 10,
  });

  const flights = data?.data;

  return (
    // Dark navy background for the whole page, matching the auth pages.
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-white">Search flights</h1>
        {/* Teal accent underline below the heading, same treatment as the auth pages */}
        <div className="mb-6 mt-2 h-1 w-38 rounded-full bg-teal-500" />

        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <FieldWithIcon icon={<MapPin size={16} />}>
            <input
              placeholder="Origin (e.g. BOM)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value.toUpperCase())}
              className={fieldClass}
            />
          </FieldWithIcon>

          <FieldWithIcon icon={<MapPin size={16} />}>
            <input
              placeholder="Destination (e.g. DEL)"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              className={fieldClass}
            />
          </FieldWithIcon>

          <FieldWithIcon icon={<Calendar size={16} />}>
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className={fieldClass}
            />
          </FieldWithIcon>
        </div>

        {isLoading && <LoadingState label="Searching flights…" />}
        {isError && <ErrorState label="Couldn't load flights. Please try again." />}
        {!isLoading && !isError && flights?.length === 0 && (
          <EmptyState label="No flights match your search. Try different dates or airports." />
        )}

        {!isLoading && !isError && flights && flights.length > 0 && (
          <>
            <ul className="flex flex-col gap-4">
              {flights.map((flight) => (
                <li
                  key={flight.id}
                  className="rounded-2xl bg-white p-6 shadow-lg"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    {/* Airline + flight number */}
                    <div className="sm:w-40 shrink-0">
                      <p className="text-lg font-bold text-slate-900">
                        {flight.airline}
                      </p>
                      <p className="text-sm font-medium text-teal-600">
                        {flight.flightNumber}
                      </p>
                    </div>

                    {/* Origin -> destination, styled like the reference image:
                        big code in a light teal pill, connecting line with a
                        plane icon in the middle. */}
                    <div className="flex flex-1 items-center justify-center gap-4">
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

                    {/* Gate + View Details, replacing price/seats from the
                        original design. */}
                    <div className="flex shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
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
                        to={`/flights/${flight.id}`}
                        className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {data && data.pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-40 disabled:pointer-events-none"
                >
                  Previous
                </button>

                <span className="text-sm text-slate-300">
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </span>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(data.pagination.totalPages, p + 1))
                  }
                  disabled={page === data.pagination.totalPages}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}