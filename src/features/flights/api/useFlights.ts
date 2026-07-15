import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/apiClient";
import type { Flight, Paginated } from "../../../types";

export interface FlightSearchParams {
  origin?: string;
  destination?: string;
  departureDate?: string;
  page?: number;
  limit?: number;
}
interface FlightResponse {
  data: Flight;
}

export function useFlights(params: FlightSearchParams) {
  return useQuery({
    queryKey: ["flights", params],
    queryFn: async () => {
      const res = await apiClient.get<Paginated<Flight>>("/flights", { params });
      return res.data;
    },
  });
}

export function useFlight(flightId: string | undefined) {
  return useQuery({
    queryKey: ["flight", flightId],
    queryFn: async () => {
      const res = await apiClient.get<FlightResponse>(`/flights/${flightId}`);
      return res.data.data;
    },
    enabled: !!flightId,
  });
}
