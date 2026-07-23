import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { BackgroundDecoration } from "./components/BackgroundDecoration";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { RoleGatedRoute } from "./routes/RoleGatedRoute";

import { LoginPage } from "./features/auth/LoginPage";
import { AdminLoginPage } from "./features/auth/AdminLoginPage";
import { RegisterPage } from "./features/auth/RegisterPage";
import { ProfilePage } from "./features/auth/ProfilePage";
import { FlightSearchPage } from "./features/flights/FlightSearchPage";
import { FlightDetailsPage } from "./features/flights/FlightDetailsPage";
import { MyBookingsPage } from "./features/bookings/MyBookingsPage";
// import { DashboardPage } from "./features/admin/DashboardPage";
import { FlightsPage } from "./features/admin/FlightsPage";
import { GateChangePage } from "./features/admin/GateChangePage";
import { AdminFlightBookingsPage } from "./features/admin/AdminFlightBookingsPage";
import { ChatbotPage } from "./features/chatbot/ChatbotPage";
import { HomePage } from "./features/home/HomePage";
import { FeedbackPage } from "./features/feedback/FeedbackPage";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <BackgroundDecoration />
      <Navbar />

      <Routes>
        {/* public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<FlightSearchPage />} />
        <Route path="/flights/:flightId" element={<FlightDetailsPage />} />

        {/* any authenticated user, either role */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* passenger only */}
        <Route element={<RoleGatedRoute allowedRoles={["PASSENGER"]} />}>
          <Route path="/bookings" element={<MyBookingsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>

        {/* manager only */}
        <Route element={<RoleGatedRoute allowedRoles={["MANAGER"]} />}>
          <Route path="/admin/chatbot" element={<ChatbotPage />} />
          <Route path="/admin/gate-change" element={<GateChangePage />} />
        </Route>

        {/* airline admin (manager or staff) */}
        <Route element={<RoleGatedRoute allowedRoles={["MANAGER", "STAFF"]} />}>
          <Route path="/admin/flights" element={<FlightsPage />} />
          <Route path="/admin/flights/:flightId/bookings" element={<AdminFlightBookingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
