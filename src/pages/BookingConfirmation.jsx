
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  FaCheckCircle,
  FaPlane,
  FaUser,
  FaTicketAlt,
  FaDownload,
  FaEnvelope,
  FaWhatsapp,
  FaCalendarAlt,
} from "react-icons/fa"

const BookingConfirmation = () => {
  const [bookingDetails, setBookingDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get booking details
    setTimeout(() => {
      setBookingDetails({
        bookingId: "NA" + Math.floor(1000000 + Math.random() * 9000000),
        pnr: "PNR" + Math.floor(10000 + Math.random() * 90000),
        flight: {
          airline: "Nepal Airlines",
          flightNumber: "RA205",
          departure: {
            airport: "KTM",
            city: "Kathmandu",
            time: "07:30",
            date: "2023-06-15",
          },
          arrival: {
            airport: "DEL",
            city: "Delhi",
            time: "09:00",
            date: "2023-06-15",
          },
          duration: "1h 30m",
        },
        passengers: [
          {
            name: "John Doe",
            seat: "12A",
            type: "Adult",
          },
        ],
        payment: {
          amount: 20600,
          method: "Credit Card",
          status: "Confirmed",
        },
      })
      setIsLoading(false)
    }, 1500)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-[#D21034] border-r-[#D21034] border-b-[#D21034] border-l-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-semibold">Processing Your Booking</h2>
        <p className="text-gray-500 mt-2">Please wait while we confirm your reservation...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Your booking has been successfully confirmed. A confirmation email has been sent to your registered email
            address.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <button className="flex items-center justify-center bg-[#003580] hover:bg-[#002a66] text-white px-6 py-2 rounded-md transition-colors">
              <FaDownload className="mr-2" />
              Download E-Ticket
            </button>
            <button className="flex items-center justify-center bg-[#D21034] hover:bg-[#b50e2c] text-white px-6 py-2 rounded-md transition-colors">
              <FaEnvelope className="mr-2" />
              Email Ticket
            </button>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-[#003580] text-white p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Booking Details</h2>
              <div className="text-sm">
                <span className="mr-2">Booking ID:</span>
                <span className="font-mono font-medium">{bookingDetails.bookingId}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Flight Information */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaPlane className="text-[#D21034] mr-3" />
                <h3 className="text-lg font-semibold">Flight Information</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 shadow-sm">
                    <FaPlane className="text-[#003580]" />
                  </div>
                  <div>
                    <div className="font-semibold">{bookingDetails.flight.airline}</div>
                    <div className="text-sm text-gray-500">{bookingDetails.flight.flightNumber}</div>
                  </div>
                  <div className="ml-auto">
                    <div className="text-sm bg-[#6d0ff2] text-white px-3 py-1 rounded-full">
                      PNR: {bookingDetails.pnr}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{bookingDetails.flight.departure.time}</div>
                    <div className="text-sm font-medium">{bookingDetails.flight.departure.airport}</div>
                    <div className="text-xs text-gray-500">{bookingDetails.flight.departure.city}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <FaCalendarAlt className="inline mr-1" />
                      {bookingDetails.flight.departure.date}
                    </div>
                  </div>

                  <div className="flex flex-col items-center px-4">
                    <div className="text-xs text-gray-500 mb-1">{bookingDetails.flight.duration}</div>
                    <div className="relative w-24 md:w-40">
                      <div className="border-t-2 border-gray-300 w-full"></div>
                      <div className="absolute -top-2 left-0 w-3 h-3 rounded-full bg-[#003580]"></div>
                      <div className="absolute -top-2 right-0 w-3 h-3 rounded-full bg-[#003580]"></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Non-stop</div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold">{bookingDetails.flight.arrival.time}</div>
                    <div className="text-sm font-medium">{bookingDetails.flight.arrival.airport}</div>
                    <div className="text-xs text-gray-500">{bookingDetails.flight.arrival.city}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      <FaCalendarAlt className="inline mr-1" />
                      {bookingDetails.flight.arrival.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaUser className="text-[#D21034] mr-3" />
                <h3 className="text-lg font-semibold">Passenger Information</h3>
              </div>

              <div className="bg-gray-50 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Type</th>
                      <th className="text-left p-4">Seat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingDetails.passengers.map((passenger, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="p-4">{passenger.name}</td>
                        <td className="p-4">{passenger.type}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center justify-center bg-[#003580] text-white w-8 h-8 rounded-md">
                            {passenger.seat}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaTicketAlt className="text-[#D21034] mr-3" />
                <h3 className="text-lg font-semibold">Payment Information</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Payment Method</div>
                    <div className="font-medium">{bookingDetails.payment.method}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="font-medium text-green-600">{bookingDetails.payment.status}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="font-bold text-[#D21034]">NPR {bookingDetails.payment.amount.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Important Information</h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm">
                <ul className="space-y-2">
                  <li>Please arrive at the airport at least 2 hours before your scheduled departure.</li>
                  <li>Carry a valid photo ID for security checks.</li>
                  <li>Check-in counters close 45 minutes before departure.</li>
                  <li>Baggage allowance: 20kg for checked baggage and 7kg for cabin baggage.</li>
                  <li>For any changes or assistance, please contact our customer service.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#003580] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCalendarAlt />
              </div>
              <h3 className="font-medium mb-2">Online Check-in</h3>
              <p className="text-sm text-gray-600">Check-in online 24 hours before your flight departure.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D21034] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUser />
              </div>
              <h3 className="font-medium mb-2">Manage Booking</h3>
              <p className="text-sm text-gray-600">Make changes to your booking, select meals, or add services.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#6d0ff2] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                <FaWhatsapp />
              </div>
              <h3 className="font-medium mb-2">Get Updates</h3>
              <p className="text-sm text-gray-600">Receive flight status updates via WhatsApp or SMS.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="mb-4">Need further assistance with your booking?</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="bg-[#003580] hover:bg-[#002a66] text-white px-6 py-3 rounded-md transition-colors">
              Return to Home
            </Link>
            <Link
              to="/my-bookings"
              className="bg-white border border-[#003580] text-[#003580] hover:bg-[#003580] hover:text-white px-6 py-3 rounded-md transition-colors"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmation

