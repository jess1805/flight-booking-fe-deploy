export type Role = "MANAGER" | "STAFF" | "PASSENGER";

export interface User {
  id: string;
  email: string;
  role: Role;
}

// NOTE: field names here (seatsAvailable/seatsTotal/gate/etc.) are assumed —
// confirm against your actual Prisma Flight model / GET /flights response
// and adjust if the real field names differ.
export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string; // ISO date string
  arrivalTime: string; // ISO date string
  gate: string | null;
  seatsAvailable: number;
  seatsTotal: number;
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
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FeedbackReference {
  feedbackId: string;
  flightNumber: string;
  travelDate: string;
  rating: number;
  category: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  references?: FeedbackReference[];
  insufficientInfo?: boolean;
}
