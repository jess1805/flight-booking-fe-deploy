import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFlight } from "./api/useFlights";
import { useCreateBooking } from "../bookings/api/useBookings";
import { useAuth } from "../auth/context/AuthContext";
import { AxiosError } from "axios";
import { LoadingState, ErrorState } from "../../components/QueryState";
import { Plane, MapPin, DoorClosed, Ticket, Lock, ArrowRight } from "lucide-react";

export function FlightDetailsPage() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: flight, isLoading, isError } = useFlight(flightId);
  const createBooking = useCreateBooking();
  const [seatNumber, setSeatNumber] = useState("");

  if (isLoading) return <LoadingState label="Loading flight details…" />;
  if (isError || !flight) return <ErrorState label="Couldn't load this flight." />;

  async function handleBook() {
    if (!seatNumber.trim() || !flight) return;
    await createBooking.mutateAsync({ flightId: flight.id, seatNumber });
    navigate("/bookings");
  }

  const bookingErrorMessage = createBooking.isError
    ? (
        createBooking.error as AxiosError<{
          error?: { message?: string };
        }>
      ).response?.data?.error?.message ?? "Unable to book the flight. Please try again."
    : "";

  const departTime = new Date(flight.departureTime);
  const arriveTime = new Date(flight.arrivalTime);
  const durationMs = arriveTime.getTime() - departTime.getTime();
  const durationHrs = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMins = Math.floor((durationMs / (1000 * 60)) % 60);

  return (
    // Dark page background, matching the rest of the app (search, bookings).
    <div className="min-h-screen bg-slate-900 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        {/* Teal header banner: logo placeholder, airline name, route summary */}
        <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-r from-teal-700 to-teal-600 p-8">
          {/* Decorative plane icon in the corner — purely visual */}
          <Plane
            size={90}
            className="absolute -right-2 -top-4 rotate-[30deg] text-teal-500/40"
          />
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white">
              <Plane size={28} className="text-teal-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {flight.airline} · {flight.flightNumber}
              </h1>
              <p className="mt-1 flex items-center gap-1.5 text-teal-50">
                <MapPin size={15} />
                {flight.origin} → {flight.destination}
                {flight.gate && (
                  <>
                    <span className="mx-1">·</span>
                    <DoorClosed size={15} />
                    Gate {flight.gate}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* White card: flight number / gate chips, timing row, convenience-fee row */}
        <div className="rounded-b-3xl bg-white p-8 shadow-lg">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2 text-teal-700">
              <Plane size={16} />
              <span className="font-semibold">{flight.flightNumber}</span>
            </div>
            {flight.gate && (
              <div className="flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2 text-teal-700">
                <DoorClosed size={16} />
                <div className="text-sm leading-none">
                  <span className="block text-teal-500">Gate</span>
                  <span className="font-semibold">{flight.gate}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="mb-2 inline-block rounded-lg bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
                {flight.origin}
              </span>
              <p className="text-3xl font-bold text-slate-900">
                {departTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center gap-1">
              <p className="text-sm text-slate-500">
                {durationHrs}h {durationMins}m
              </p>
              <div className="flex w-full items-center gap-2 text-teal-500">
                <span className="h-px flex-1 bg-slate-200" />
                <ArrowRight size={18} />
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <p className="text-sm text-slate-500">Nonstop</p>
            </div>

            <div className="text-right">
              <span className="mb-2 inline-block rounded-lg bg-teal-50 px-3 py-1 text-sm font-bold text-teal-700">
                {flight.destination}
              </span>
              <p className="text-3xl font-bold text-slate-900">
                {arriveTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-3 text-sm text-slate-600">
            <Ticket size={18} className="text-teal-600" />
            {flight.availableSeats} seat{flight.availableSeats === 1 ? "" : "s"} available
          </div>
        </div>

        {/* Booking area / login prompt banner, spaced below the card */}
        <div className="mt-4">
          {!user || user.role !== "PASSENGER" ? (
            <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-teal-50 p-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-teal-200">
                  <Lock size={18} className="text-teal-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Log in as a passenger</p>
                  <p className="text-sm text-slate-600">to book a seat on this flight.</p>
                </div>
              </div>
              <Link
                to="/login"
                className="flex items-center gap-2 rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
              >
                Login Now
                <ArrowRight size={16} />
              </Link>
            </div>
          ) : flight.availableSeats === 0 ? (
            <ErrorState label="This flight is fully booked." />
          ) : (
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <label htmlFor="seat" className="mb-2 block text-sm font-semibold text-slate-700">
                    Seat number
                  </label>
                  <input
                    id="seat"
                    placeholder="e.g. 14A"
                    value={seatNumber}
                    onChange={(e) => setSeatNumber(e.target.value.toUpperCase())}
                    className="w-full h-11 rounded-xl border border-teal-200 bg-teal-50 px-4 text-slate-900 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                  />
                </div>
                <button
                  onClick={handleBook}
                  disabled={!seatNumber.trim() || createBooking.isPending}
                  className="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-50"
                >
                  {createBooking.isPending ? "Booking…" : "Book seat"}
                </button>
              </div>

              {createBooking.isError && (
                <p className="mt-3 text-sm text-red-600">{bookingErrorMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}