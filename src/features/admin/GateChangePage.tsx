import { useFlights } from "../flights/api/useFlights";
import { GateForm } from "./components/GateForm";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";
import { Plane, DoorOpen, ArrowRight } from "lucide-react";
import { TwoToneHeading } from "../../components/TwoToneHeading";

// unused
// const airlineAccent: Record<string, string> = {
//   "Air India": "text-red-600",
//   IndiGo: "text-blue-700",
//   SpiceJet: "text-red-500",
// };

export function GateChangePage() {
  const { data, isLoading, isError } = useFlights({ limit: 50 });
  const flights = data?.data;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-10">
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600">
            <DoorOpen size={26} className="text-white" />
          </div>
          <div>
            <TwoToneHeading first="Gate" second="change" className="text-3xl font-bold" />
            <p className="mt-2 text-slate-400">
              Update gates for flights and keep passengers informed{" "}
              <span className="text-teal-400">in real-time.</span>
            </p>
          </div>
        </div>

        {isLoading && <LoadingState label="Loading flights…" />}
        {isError && <ErrorState label="Couldn't load flights." />}
        {!isLoading && !isError && flights?.length === 0 && (
          <EmptyState label="No flights found." />
        )}

        {!isLoading && !isError && flights && flights.length > 0 && (
          <ul className="flex flex-col gap-4">
            {flights.map((flight) => (
              <li
                key={flight.id}
                className="flex flex-col gap-4 rounded-2xl border-l-4 border-teal-500 bg-white p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Airline icon + name + route */}
                <div className="flex items-center gap-4 sm:w-56 shrink-0">
                  <div>
                    <p className="font-bold text-slate-900">
                      {flight.airline} · {flight.flightNumber}
                    </p>
                    <p className="text-sm text-teal-600">
                      {flight.origin} → {flight.destination}
                    </p>
                  </div>
                </div>

                {/* current gate */}
                <div className="flex flex-1 items-center justify-center gap-3 text-teal-500">
                  <Plane size={16} className="rotate-[270deg]" />
                  <span className="rounded-lg bg-teal-50 px-6 py-2 text-2xl font-bold text-teal-700">
                    {flight.gate ?? "—"}
                  </span>
                  <ArrowRight size={16} />
                </div>

                {/* Gate update form */}
                <div className="shrink-0">
                  <GateForm flightId={flight.id} currentGate={flight.gate} />
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* footer line */}
        <div className="mt-10 flex items-center justify-center gap-2 text-teal-500">
          <Plane size={16} />
          <span className="text-sm">Manage gates efficiently and ensure smooth operations.</span>
        </div>
      </div>
    </div>
  );
}