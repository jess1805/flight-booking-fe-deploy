import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFlight } from "./api/useFlights";
import { useCreateBooking } from "../bookings/api/useBookings";
import { useAuth } from "../auth/context/AuthContext";
import { AxiosError } from "axios";
import { LoadingState, ErrorState } from "../../components/QueryState";

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

  const bookingErrorMessage =
  createBooking.isError
    ? (
        createBooking.error as AxiosError<{
          error?: { message?: string };
        }>
      ).response?.data?.error?.message ??
      "Unable to book the flight. Please try again."
    : "";


  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-semibold text-slate-900">
        {flight.airline} · {flight.flightNumber}
      </h1>
      <p className="mb-6 text-slate-500">
        {flight.origin} → {flight.destination}
        {flight.gate ? ` · Gate ${flight.gate}` : ""}
      </p>

      <div className="mb-6 grid grid-cols-2 gap-4 rounded-lg border border-slate-200 p-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-slate-500">Departs</p>
          <p className="font-medium">{new Date(flight.departureTime).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-500">Arrives</p>
          <p className="font-medium">{new Date(flight.arrivalTime).toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-500">Seats available</p>
          <p className="font-medium">
            {flight.seatsAvailable} / {flight.seatsTotal}
          </p>
        </div>
      </div>

      {!user || user.role !== "PASSENGER" ? (
        <p className="text-sm text-slate-500">
          <Link to="/login" className="font-medium text-slate-900 underline">
            Log in as a passenger
          </Link>{" "}
          to book a seat on this flight.
        </p>
      ) : flight.seatsAvailable === 0 ? (
        <ErrorState label="This flight is fully booked." />
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="seat" className="mb-1 block text-sm font-medium text-slate-700">
              Seat number
            </label>
            <input
              id="seat"
              placeholder="e.g. 14A"
              value={seatNumber}
              onChange={(e) => setSeatNumber(e.target.value.toUpperCase())}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={handleBook}
            disabled={!seatNumber.trim() || createBooking.isPending}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {createBooking.isPending ? "Booking…" : "Book seat"}
          </button>
        </div>
      )}

      {createBooking.isError && (
        <p className="mt-3 text-sm text-red-600">
          {bookingErrorMessage}
        </p>
      )}
    </div>
  );
}
