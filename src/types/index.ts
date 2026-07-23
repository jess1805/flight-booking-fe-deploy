export type Role = "MANAGER" | "STAFF" | "PASSENGER";

export interface User {
  id: string;
  email: string;
  role: Role;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string; // ISO date string
  arrivalTime: string; // ISO date string
  gate: string | null;
  availableSeats: number;
  totalSeats: number;
}

export type BookingStatus = "CONFIRMED" | "CANCELLED";

export interface Booking {
  id: string;
  flightId: string;
  flight: Flight;
  seatNumber: string;
  status: BookingStatus;
  createdAt: string;
}

export interface Paginated<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FlightBooking extends Booking {
  passenger: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Citation {
  flightNumber: string;
  origin: string;
  destination: string;
  category: string;
  rating: number;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
}
