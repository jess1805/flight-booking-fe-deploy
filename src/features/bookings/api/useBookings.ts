import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import type { Booking, Paginated } from "../../../types";

export function useMyBookings(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["bookings", "mine", page, limit],
    queryFn: async () => {
      const res = await apiClient.get<Paginated<Booking>>("/bookings", {
        params: { page, limit },
      });
      return res.data;
    },
  });
}

interface BookingResponse {
  data: Booking;
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ flightId, seatNumber }: { flightId: string; seatNumber: string }) => {
      const res = await apiClient.post<BookingResponse>("/bookings", {
          flightId,
          seatNumber,
        });

        return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "mine"] });
    },
  });
}

export function useCancelBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (bookingId: string) => {
      await apiClient.patch(`/bookings/${bookingId}/cancel`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "mine"] });
    },
  });
}
