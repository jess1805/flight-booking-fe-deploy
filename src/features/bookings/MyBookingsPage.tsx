import { useState } from "react";
import { useMyBookings, useCancelBooking } from "./api/useBookings";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";
import { AxiosError } from "axios";
import { Plane, ArmchairIcon, CheckCircle2, XCircle } from "lucide-react";
import { TwoToneHeading } from "../../components/TwoToneHeading";

// airport code -> city
const airportCityNames: Record<string, string> = {
  DEL: "Delhi",
  BOM: "Mumbai",
  BLR: "Bengaluru",
  HYD: "Hyderabad",
  MAA: "Chennai",
  CCU: "Kolkata",
  GOI: "Goa",
  AMD: "Ahmedabad",
};

export function MyBookingsPage() {
  const [page, setPage] = useState(1);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const { data, isLoading, isError } = useMyBookings(page);
  const cancelBooking = useCancelBooking();

  const cancelErrorMessage = cancelBooking.isError
    ? (
        cancelBooking.error as AxiosError<{
          error?: { message?: string };
        }>
      ).response?.data?.error?.message ?? "Unable to cancel the booking. Please try again."
    : "";

  const bookings = data?.data;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-10">
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <TwoToneHeading first="My" second="bookings" className="text-4xl font-bold" />
        <p className="mb-8 mt-3 text-slate-400">
          View and manage all your flight bookings in one place.
        </p>

        {isLoading && <LoadingState label="Loading your bookings…" />}
        {isError && <ErrorState label="Couldn't load your bookings." />}
        {!isLoading && !isError && bookings?.length === 0 && (
          <EmptyState label="You haven't booked any flights yet." />
        )}

        {!isLoading && !isError && bookings && bookings.length > 0 && (
          <>
            <ul className="flex flex-col gap-5">
              {bookings.map((booking) => {
                const isCancelled = booking.status === "CANCELLED";
                return (
                  <li
                    key={booking.id}
                    className="rounded-2xl border-l-4 border-teal-500 bg-white p-6 shadow-lg"
                  >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      {/* airline + flight number */}
                      <div className="flex shrink-0 items-center gap-4 sm:w-44">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                          <Plane size={22} className="text-teal-600" />
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-900">
                            {booking.flight.airline}
                          </p>
                          <p className="text-sm font-medium text-teal-600">
                            {booking.flight.flightNumber}
                          </p>
                        </div>
                      </div>

                      {/* origin -> destination */}
                      <div className="flex flex-1 flex-col items-center gap-3">
                        <div className="flex w-full items-center justify-center gap-4">
                          <div className="text-center">
                            <span className="inline-block rounded-lg bg-teal-50 px-4 py-2 text-xl font-bold text-teal-700">
                              {booking.flight.origin}
                            </span>
                            <p className="mt-1 text-sm text-slate-500">
                              {airportCityNames[booking.flight.origin] ?? ""}
                            </p>
                          </div>

                          <div className="flex flex-1 items-center gap-2 text-teal-500">
                            <span className="h-px flex-1 border-t border-dashed border-teal-300" />
                            <Plane size={18} />
                            <span className="h-px flex-1 border-t border-dashed border-teal-300" />
                          </div>

                          <div className="text-center">
                            <span className="inline-block rounded-lg bg-teal-50 px-4 py-2 text-xl font-bold text-teal-700">
                              {booking.flight.destination}
                            </span>
                            <p className="mt-1 text-sm text-slate-500">
                              {airportCityNames[booking.flight.destination] ?? ""}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-50 py-2.5 text-teal-700">
                          <ArmchairIcon size={16} />
                          <span className="font-medium">Seat {booking.seatNumber}</span>
                        </div>
                      </div>

                      {/* status + action */}
                      <div className="flex shrink-0 flex-col items-stretch gap-3 sm:w-48">
                        {isCancelled ? (
                          <span className="flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                            <XCircle size={16} />
                            CANCELLED
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2 rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
                            <CheckCircle2 size={16} />
                            CONFIRMED
                          </span>
                        )}

                        {isCancelled ? null : confirmingId === booking.id ? (
                          <div className="flex flex-col gap-2">
                            <p className="text-center text-xs text-slate-600">
                              Are you sure you want to cancel this booking?
                            </p>
                            <button
                              onClick={() => {
                                cancelBooking.mutate(booking.id);
                                setConfirmingId(null);
                              }}
                              disabled={cancelBooking.isPending}
                              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                            >
                              {cancelBooking.isPending ? "Cancelling…" : "Confirm cancel"}
                            </button>
                            <button
                              onClick={() => setConfirmingId(null)}
                              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                            >
                              Keep booking
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmingId(booking.id)}
                            className="rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {cancelBooking.isError && (
              <p className="mt-4 text-sm text-red-400">{cancelErrorMessage}</p>
            )}

            {data && data.pagination.totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-40 disabled:pointer-events-none"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-300">
                  Page {data.pagination.page} of {data.pagination.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                  disabled={page >= data.pagination.totalPages}
                  className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-700 disabled:opacity-40 disabled:pointer-events-none"
                >
                  Next
                </button>
              </div>
            )}

            {/* footer line */}
            <div className="mt-10 flex items-center justify-center gap-2 text-teal-500">
              <Plane size={16} />
              <span className="text-sm">Thank you for flying with SkyRoute</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}