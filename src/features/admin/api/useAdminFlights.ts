import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import type { Booking, Flight, Paginated } from "../../../types";

interface FlightResponse {
  data: Flight;
}


export function useUpdateGate(flightId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (gate: string) => {
          const res = await apiClient.patch<FlightResponse>(
      `/flights/${flightId}/gate`,
      { gate }
);

return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["flights"] });
      queryClient.invalidateQueries({ queryKey: ["flight", flightId] });
    },
  });
}

export function useFlightBookings(flightId: string | undefined) {
  return useQuery({
    queryKey: ["admin", "flight-bookings", flightId],
    queryFn: async () => {
      const res = await apiClient.get<Paginated<Booking>>(`/flights/${flightId}/bookings`);
      return res.data;
    },
    enabled: !!flightId,
  });
}
