import { useState } from "react";
import { Link } from "react-router-dom";
import { useFlights } from "./api/useFlights";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";

export function FlightSearchPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");

  const { data, isLoading, isError } = useFlights({
    origin: origin || undefined,
    destination: destination || undefined,
    departureDate: departureDate || undefined,
  });
  const flights = data?.data;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Search flights</h1>

      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <input
          placeholder="Origin (e.g. BOM)"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          placeholder="Destination (e.g. DEL)"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      {isLoading && <LoadingState label="Searching flights…" />}
      {isError && <ErrorState label="Couldn't load flights. Please try again." />}
      {!isLoading && !isError && flights?.length === 0 && (
        <EmptyState label="No flights match your search. Try different dates or airports." />
      )}

      {!isLoading && !isError && flights && flights.length > 0 && (
        <ul className="flex flex-col gap-3">
          {flights.map((flight) => (
            <li key={flight.id}>
              <Link
                to={`/flights/${flight.id}`}
                className="flex flex-col justify-between gap-2 rounded-lg border border-slate-200 p-4 hover:border-slate-400 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {flight.airline} · {flight.flightNumber}
                  </p>
                  <p className="text-sm text-slate-500">
                    {flight.origin} → {flight.destination}
                    {flight.gate ? ` · Gate ${flight.gate}` : ""}
                  </p>
                </div>
                <p className="text-sm text-slate-500">{flight.seatsAvailable} seats left</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
