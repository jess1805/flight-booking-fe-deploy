import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-5xl font-bold">
            Welcome to FlightBooker
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Search flights, manage bookings, and explore everything our airport
            has to offer.
          </p>

          <Link
            to="/search"
            className="inline-block mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Search Flights
          </Link>
        </div>
      </section>

      {/* Airport Services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">
          Airport Services
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="rounded-lg border p-6">🛋️ Lounges</div>
          <div className="rounded-lg border p-6">🍽 Restaurants</div>
          <div className="rounded-lg border p-6">🛍 Shopping</div>
          <div className="rounded-lg border p-6">📶 Free WiFi</div>
          <div className="rounded-lg border p-6">🚗 Parking</div>
          <div className="rounded-lg border p-6">🏨 Hotels</div>
        </div>
      </section>

      {/* Airport Information */}
      <section className="bg-slate-100 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl font-bold mb-8">
            Airport Information
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg bg-white p-6 shadow">
              Terminal Maps
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              Check-in Information
            </div>

            <div className="rounded-lg bg-white p-6 shadow">
              Baggage Services
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 text-center">
        © 2026 FlightBooker. All Rights Reserved.
      </footer>
    </main>
  );
}