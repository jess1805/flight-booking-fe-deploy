import { useParams } from "react-router-dom";
import { useFlightBookings } from "./api/useAdminFlights";
import { LoadingState, ErrorState, EmptyState } from "../../components/QueryState";
import { Ticket, Mail, Armchair, CheckCircle2, XCircle } from "lucide-react";
import { TwoToneHeading } from "../../components/TwoToneHeading";

export function AdminFlightBookingsPage() {
  const { flightId } = useParams();
  const { data, isLoading, isError } = useFlightBookings(flightId);
  const bookings = data?.data;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 px-4 py-10">
      <div className="relative z-10 mx-auto w-full max-w-2xl">
        {/* header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-600">
            <Ticket size={26} className="text-white" />
          </div>
          <div>
            <TwoToneHeading first="Flight" second="bookings" className="text-3xl font-bold" />
            <p className="mt-2 text-slate-400">
              View and manage all bookings for the selected flight.
            </p>
          </div>
        </div>

        {isLoading && <LoadingState label="Loading bookings…" />}
        {isError && <ErrorState label="Couldn't load bookings for this flight." />}
        {!isLoading && !isError && bookings?.length === 0 && (
          <EmptyState label="No bookings for this flight yet." />
        )}

        {!isLoading && !isError && bookings && bookings.length > 0 && (
          <ul className="flex flex-col gap-4">
            {bookings.map((booking) => {
              const isConfirmed = booking.status === "CONFIRMED";
              const initials = booking.passenger.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <li
                  key={booking.id}
                  className={
                    "flex items-center justify-between gap-4 rounded-2xl border-l-4 bg-white p-5 shadow-lg " +
                    (isConfirmed ? "border-teal-500" : "border-red-500")
                  }
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold " +
                        (isConfirmed ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-600")
                      }
                    >
                      {initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{booking.passenger.name}</p>
                      <p className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Mail size={14} className="text-teal-600" />
                        {booking.passenger.email}
                      </p>
                      <p className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Armchair size={14} className="text-teal-600" />
                        Seat {booking.seatNumber}
                      </p>
                    </div>
                  </div>

                  <span
                    className={
                      "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wide " +
                      (isConfirmed
                        ? "bg-teal-50 text-teal-700"
                        : "bg-red-50 text-red-600")
                    }
                  >
                    {isConfirmed ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                    {booking.status}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {/* footer line */}
      </div>
    </div>
  );
}