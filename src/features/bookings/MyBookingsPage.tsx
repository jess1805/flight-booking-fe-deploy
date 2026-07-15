import { useState } from "react";
import { useMyBookings, useCancelBooking } from "./api/useBookings";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";
import { AxiosError } from "axios";

export function MyBookingsPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useMyBookings(page);
  const cancelBooking = useCancelBooking();

  const cancelErrorMessage =
  cancelBooking.isError
    ? (
        cancelBooking.error as AxiosError<{
          error?: { message?: string };
        }>
      ).response?.data?.error?.message ??
      "Unable to cancel the booking. Please try again."
    : "";

  const bookings = data?.data;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">My bookings</h1>

      {isLoading && <LoadingState label="Loading your bookings…" />}
      {isError && <ErrorState label="Couldn't load your bookings." />}
      {!isLoading && !isError && bookings?.length === 0 && (
        <EmptyState label="You haven't booked any flights yet." />
      )}

      {!isLoading && !isError && bookings && bookings.length > 0 && (
        <>
          <ul className="flex flex-col gap-3">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="flex flex-col justify-between gap-3 rounded-lg border border-slate-200 p-4 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium text-slate-900">
                    {booking.flight.airline} · {booking.flight.flightNumber}
                  </p>
                  <p className="text-sm text-slate-500">
                    {booking.flight.origin} → {booking.flight.destination} · Seat{" "}
                    {booking.seatNumber}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                    {booking.status}
                  </p>
                </div>

                {booking.status === "CONFIRMED" && (
                  <button
                    onClick={() => cancelBooking.mutate(booking.id)}
                    disabled={cancelBooking.isPending}
                    className="self-start rounded-md border border-red-300 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                )}
              </li>
            ))}
          </ul>
          {cancelBooking.isError && (
            <p className="mt-4 text-sm text-red-600">
              {cancelErrorMessage}
            </p>
          )}

          {data && data.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between text-sm">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="rounded-md border border-slate-300 px-3 py-1.5 disabled:opacity-40"
              >
                Previous
              </button>
              <span className="text-slate-500">
                Page {data.page} of {data.totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page >= data.totalPages}
                className="rounded-md border border-slate-300 px-3 py-1.5 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
