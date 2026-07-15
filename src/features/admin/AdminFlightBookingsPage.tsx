import { useParams } from "react-router-dom";
import { useFlightBookings } from "./api/useAdminFlights";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";

export function AdminFlightBookingsPage() {
  const { flightId } = useParams();
  const { data, isLoading, isError } = useFlightBookings(flightId);
  const bookings = data?.data;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Flight bookings</h1>

      {isLoading && <LoadingState label="Loading bookings…" />}
      {isError && <ErrorState label="Couldn't load bookings for this flight." />}
      {!isLoading && !isError && bookings?.length === 0 && (
        <EmptyState label="No bookings for this flight yet." />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <ul className="flex flex-col gap-2">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="flex items-center justify-between rounded-md border border-slate-200 px-4 py-3 text-sm"
            >
              <span>Seat {booking.seatNumber}</span>
              <span className="text-xs uppercase tracking-wide text-slate-400">
                {booking.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
