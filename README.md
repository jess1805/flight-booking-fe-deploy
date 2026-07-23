# SkyRoute Frontend

A modern React + TypeScript frontend for **SkyRoute**, a full-stack Flight Booking and Flight Management System. The application provides an intuitive interface for passengers to search and book flights while enabling airline administrators to manage flight operations through a secure role-based portal.

The frontend communicates with the backend through REST APIs and supports separate authentication flows for passengers and administrators.

---

# Features

## Public Features

- Landing Page
- Flight Search
- Flight Details
- Airport Services
- Restaurants
- Lounges
- Shopping Information

## Passenger Features

- Passenger Registration
- Passenger Login
- Search Flights
- View Flight Details
- Book Flights
- View Booking History
- Profile Management
- Submit Customer Feedback

## Admin Features

The application supports two administrator roles:

### Manager

- Flight Management
- View Flight Bookings
- Gate Change Management
- AI-powered Feedback Chatbot

### Staff

- Flight Management
- View Flight Bookings

---

# Technology Stack

| Category | Technology |
|-----------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite |
| Routing | React Router |
| State Management | React Context API |
| Server State | TanStack Query |
| Forms | React Hook Form |
| Validation | Zod |
| HTTP Client | Axios |
| Styling | Tailwind CSS |
| Icons | Lucide React |

---

# Authentication & Authorization

The frontend supports two independent authentication systems:

- Passenger Authentication
- Admin Authentication (Manager / Staff)

After a successful login, the backend generates a JWT token. The frontend stores the session and automatically includes the token with every protected API request.

Role-Based Access Control (RBAC) ensures users can only access features permitted for their role.

| Role | Access |
|------|--------|
| Passenger | Flight Booking, Profile, Bookings, Feedback |
| Staff | Flight Management, Booking Management |
| Manager | All Staff Features + Gate Management + AI Chatbot |

---

# Project Structure

The frontend follows a **feature-based architecture**, where each feature owns its pages, API interactions, hooks, and components.

```
src/
│
├── components/
│   ├── Shared reusable UI components
│   ├── Navigation
│   ├── Forms
│   └── Common UI elements
│
├── features/
│   ├── Home
│   ├── Authentication
│   ├── Flights
│   ├── Bookings
│   ├── Feedback
│   ├── Chatbot
│   └── Admin
│
├── context/
│
├── routes/
│
├── styles/
│
├── types/
│
├── utils/
│
├── App.tsx
└── main.tsx
```

---

# Routing

## Public Routes

- Home
- Flight Search
- Flight Details
- Passenger Login
- Passenger Registration
- Admin Login

## Protected Passenger Routes

- Profile
- My Bookings
- Feedback

## Protected Admin Routes

- Flight Management
- Flight Bookings
- Gate Management
- AI Chatbot (Manager only)

Unauthorized users are automatically redirected based on their authentication status and role.

---

# API Communication

The frontend communicates with the backend using REST APIs through Axios.

TanStack Query is responsible for:

- Data Fetching
- Caching
- Loading States
- Error Handling
- Automatic Data Refresh

---

# Form Validation

Forms are built using React Hook Form together with Zod.

Validation includes:

- Required Fields
- Email Validation
- Password Validation
- Flight Search Validation

---

# AI Feedback Chatbot

Managers have access to an AI-powered chatbot that allows them to ask natural-language questions about customer feedback.

The chatbot:

- Sends queries to the backend
- Displays AI-generated responses
- Shows supporting citations
- Is accessible only to Managers

---

# User Interface

The application follows a modern airport-inspired design featuring:

- Responsive Layout
- Teal Theme
- Glassmorphism Effects
- Interactive Cards
- Smooth Navigation
- Mobile-Friendly Design

---

# Environment Variables

Create a `.env` file in the project root.

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Copy the environment variables

```bash
cp .env.example .env
```

Start the development server

```bash
npm run dev
```

---

# Production Build

Build the application

```bash
npm run build
```

Preview the production build

```bash
npm run preview
```

---

# Project Highlights

- React + TypeScript
- Feature-Based Architecture
- JWT Authentication
- Role-Based Access Control (RBAC)
- REST API Integration
- TanStack Query
- React Hook Form + Zod
- Responsive User Interface
- AI-powered Feedback Chatbot
- Tailwind CSS

---

# Future Enhancements

- Online Payment Integration
- Email Notifications
- Flight Status Tracking
- Seat Selection Improvements
- Push Notifications
- Multi-language Support
- Analytics Dashboard
