"use client"

import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import HomePage from "./pages/HomePage"
import FlightResults from "./pages/FlightResults"
import SeatSelection from "./pages/SeatSelection"
import Payment from "./pages/Payment"
import BookingConfirmation from "./pages/BookingConfirmation"
import FlightStatus from "./pages/FlightStatus"
import MyBookings from "./pages/MyBookings"
import "./index.css"

function App() {
  const [searchParams, setSearchParams] = useState(null)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage setSearchParams={setSearchParams} />} />
          <Route
            path="/flights"
            element={<FlightResults searchParams={searchParams} setSelectedFlight={setSelectedFlight} />}
          />
          <Route
            path="/select-seats"
            element={
              <SeatSelection
                selectedFlight={selectedFlight}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
              />
            }
          />
          <Route path="/payment" element={<Payment selectedFlight={selectedFlight} selectedSeats={selectedSeats} />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
          <Route path="/flight-status" element={<FlightStatus />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App

