

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaSearch, FaPlane, FaTicketAlt, FaEdit, FaDownload, FaExclamationTriangle } from "react-icons/fa"

const MyBookings = () => {
  const [searchType, setSearchType] = useState("bookingReference")
  const [searchData, setSearchData] = useState({
    bookingReference: "",
    lastName: "",
    email: "",
    flightNumber: "",
    departureDate: "",
  })
  const [bookings, setBookings] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchData({
      ...searchData,
      [name]: value,
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      // Mock bookings data
      if (
        searchData.bookingReference === "NA1234567" ||
        searchData.lastName === "Bhattarai" ||
        searchData.email === "your@gmail.com"
      ) {
        setBookings([
          {
            id: 1,
            bookingReference: "NA1234567",
            pnr: "PNR12345",
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
            },
            passengers: [
              {
                name: "Sisan Bhattarai",
                type: "Adult",
              },
            ],
            status: "Confirmed",
            canCheckIn: true,
          },
          {
            id: 2,
            bookingReference: "NA7654321",
            pnr: "PNR54321",
            flight: {
              airline: "Nepal Airlines",
              flightNumber: "RA206",
              departure: {
                airport: "DEL",
                city: "Delhi",
                time: "10:30",
                date: "2023-06-22",
              },
              arrival: {
                airport: "KTM",
                city: "Kathmandu",
                time: "12:00",
                date: "2023-06-22",
              },
            },
            passengers: [
              {
                name: "Sisan Bhattarai",
                type: "Adult",
              },
            ],
            status: "Confirmed",
            canCheckIn: false,
          },
        ])
      } else {
        setError("No bookings found with the provided information. Please check your details and try again.")
      }

      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">My Bookings</h1>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${searchType === "bookingReference" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
            onClick={() => setSearchType("bookingReference")}
          >
            By Booking Reference
          </button>
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${searchType === "nameEmail" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
            onClick={() => setSearchType("nameEmail")}
          >
            By Name & Email
          </button>
          <button
            className={`px-4 py-2 rounded-md whitespace-nowrap ${searchType === "flightDetails" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
            onClick={() => setSearchType("flightDetails")}
          >
            By Flight Details
          </button>
        </div>

        <form onSubmit={handleSearch}>
          {searchType === "bookingReference" && (
            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">Booking Reference</label>
              <input
                type="text"
                name="bookingReference"
                value={searchData.bookingReference}
                onChange={handleInputChange}
                placeholder="e.g. NA1234567"
                className="input-field"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the booking reference number from your confirmation email.
              </p>
            </div>
          )}

          {searchType === "nameEmail" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={searchData.lastName}
                  onChange={handleInputChange}
                  placeholder="e.g.Last Name"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={searchData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. your@gmail.com"
                  className="input-field"
                  required
                />
              </div>
            </div>
          )}

          {searchType === "flightDetails" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Flight Number</label>
                <input
                  type="text"
                  name="flightNumber"
                  value={searchData.flightNumber}
                  onChange={handleInputChange}
                  placeholder="e.g. RA205"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Departure Date</label>
                <input
                  type="date"
                  name="departureDate"
                  value={searchData.departureDate}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-[#D21034] hover:bg-[#b50e2c] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center transition-colors"
          >
            <FaSearch className="mr-2" />
            Find My Booking
          </button>
        </form>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 border-4 border-t-[#D21034] border-r-[#D21034] border-b-[#D21034] border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for your bookings...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-red-500 text-xl mt-0.5 mr-3" />
            <div>
              <h3 className="font-semibold text-red-800 mb-1">No Bookings Found</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Bookings List */}
      {bookings && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Your Bookings</h2>

          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-[#003580] text-white p-4">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex items-center mb-2 md:mb-0">
                    <FaTicketAlt className="mr-2" />
                    <span className="font-semibold">Booking Reference: {booking.bookingReference}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">PNR: {booking.pnr}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  {/* Flight Details */}
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <FaPlane className="text-[#D21034] mr-2" />
                      <h3 className="font-semibold">
                        {booking.flight.airline} {booking.flight.flightNumber}
                      </h3>
                    </div>

                    <div className="flex items-center mt-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">{booking.flight.departure.time}</div>
                        <div className="text-sm font-medium">{booking.flight.departure.airport}</div>
                        <div className="text-xs text-gray-500">{booking.flight.departure.city}</div>
                        <div className="text-xs text-gray-500">{booking.flight.departure.date}</div>
                      </div>

                      <div className="mx-4">
                        <div className="w-16 md:w-32 h-px bg-gray-300 my-1 relative">
                          <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-[#003580]"></div>
                          <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#003580]"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-xl font-bold">{booking.flight.arrival.time}</div>
                        <div className="text-sm font-medium">{booking.flight.arrival.airport}</div>
                        <div className="text-xs text-gray-500">{booking.flight.arrival.city}</div>
                        <div className="text-xs text-gray-500">{booking.flight.arrival.date}</div>
                      </div>
                    </div>
                  </div>

                  {/* Passenger Details */}
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold mb-2">Passengers</h3>
                    <ul className="space-y-1">
                      {booking.passengers.map((passenger, index) => (
                        <li key={index} className="text-sm">
                          {passenger.name} ({passenger.type})
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    {booking.canCheckIn && (
                      <button className="bg-[#D21034] hover:bg-[#b50e2c] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Check-in Now
                      </button>
                    )}
                    <button className="bg-[#003580] hover:bg-[#002a66] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      <FaDownload className="inline mr-1" /> Download E-Ticket
                    </button>
                    <button className="border border-[#003580] text-[#003580] hover:bg-[#003580] hover:text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      <FaEdit className="inline mr-1" /> Manage Booking
                    </button>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-gray-50 px-4 py-2 rounded-md text-sm">
                      <span className="font-medium">Check-in:</span> Opens 24 hours before departure
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-md text-sm">
                      <span className="font-medium">Baggage:</span> 20kg checked, 7kg cabin
                    </div>
                    <div className="bg-gray-50 px-4 py-2 rounded-md text-sm">
                      <span className="font-medium">Meal:</span> Included
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Section */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Can't find your booking?</h3>
            <p className="text-sm text-gray-600 mb-3">
              If you can't find your booking, please check your email for the confirmation or contact our customer
              service.
            </p>
            <Link to="/contact" className="text-[#003580] hover:underline text-sm font-medium">
              Contact Customer Service
            </Link>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Need to change your booking?</h3>
            <p className="text-sm text-gray-600 mb-3">
              You can modify your booking up to 24 hours before departure, subject to fare conditions.
            </p>
            <Link to="/faq" className="text-[#003580] hover:underline text-sm font-medium">
              Read our Change Policy
            </Link>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Check-in Information</h3>
            <p className="text-sm text-gray-600 mb-3">
              Online check-in opens 24 hours before departure and closes 3 hours before departure.
            </p>
            <Link to="/check-in" className="text-[#003580] hover:underline text-sm font-medium">
              Learn More About Check-in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyBookings

