

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPlane, FaFilter, FaSuitcase, FaUtensils, FaWifi, FaRegClock } from "react-icons/fa"

const FlightResults = ({ searchParams, setSelectedFlight }) => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    price: [0, 100000],
    stops: "any",
    airlines: [],
    departureTime: "any",
    arrivalTime: "any",
  })

  // Mock flight data
  const flights = [
    {
      id: 1,
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
      stops: 0,
      price: 18900,
      amenities: ["meal", "baggage", "entertainment"],
      seatsAvailable: 24,
    },
    {
      id: 2,
      airline: "Nepal Airlines",
      flightNumber: "RA405",
      departure: {
        airport: "KTM",
        city: "Kathmandu",
        time: "14:45",
        date: "2023-06-15",
      },
      arrival: {
        airport: "DEL",
        city: "Delhi",
        time: "16:15",
        date: "2023-06-15",
      },
      duration: "1h 30m",
      stops: 0,
      price: 19500,
      amenities: ["meal", "baggage", "wifi", "entertainment"],
      seatsAvailable: 12,
    },
    {
      id: 3,
      airline: "Nepal Airlines",
      flightNumber: "RA301",
      departure: {
        airport: "KTM",
        city: "Kathmandu",
        time: "10:15",
        date: "2023-06-15",
      },
      arrival: {
        airport: "DEL",
        city: "Delhi",
        time: "13:30",
        date: "2023-06-15",
      },
      duration: "3h 15m",
      stops: 1,
      stopDetails: [
        {
          airport: "LKO",
          city: "Lucknow",
          duration: "45m",
        },
      ],
      price: 17200,
      amenities: ["meal", "baggage"],
      seatsAvailable: 32,
    },
  ]

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight)
    navigate("/select-seats")
  }

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "meal":
        return <FaUtensils className="text-gray-600" title="Complimentary Meal" />
      case "baggage":
        return <FaSuitcase className="text-gray-600" title="Checked Baggage Included" />
      case "wifi":
        return <FaWifi className="text-gray-600" title="In-flight WiFi" />
      case "entertainment":
        return <FaPlane className="text-gray-600" title="In-flight Entertainment" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Flight Search Results</h1>

      {/* Search Summary */}
      <div className="bg-[#003580] text-white p-4 rounded-lg mb-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center mb-2 md:mb-0">
            <div className="mr-4">
              <div className="font-bold">
                {searchParams?.from || "Kathmandu"} → {searchParams?.to || "Delhi"}
              </div>
              <div className="text-sm">
                {searchParams?.departDate || "2023-06-15"} | {searchParams?.passengers?.adults || 1} Adult(s)
              </div>
            </div>
          </div>
          <button className="bg-white text-[#003580] px-4 py-2 rounded-md text-sm font-medium">Modify Search</button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            <div className="flex items-center mb-4">
              <FaFilter className="mr-2 text-[#003580]" />
              <h2 className="text-lg font-semibold">Filters</h2>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <input
                type="range"
                min="0"
                max="100000"
                className="w-full accent-[#6d0ff2]"
                value={filters.price[1]}
                onChange={(e) => setFilters({ ...filters, price: [0, Number.parseInt(e.target.value)] })}
              />
              <div className="flex justify-between text-sm">
                <span>NPR 0</span>
                <span>NPR {filters.price[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Stops */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Stops</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="stops"
                    value="any"
                    checked={filters.stops === "any"}
                    onChange={() => setFilters({ ...filters, stops: "any" })}
                    className="mr-2 accent-[#6d0ff2]"
                  />
                  Any
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="stops"
                    value="0"
                    checked={filters.stops === "0"}
                    onChange={() => setFilters({ ...filters, stops: "0" })}
                    className="mr-2 accent-[#6d0ff2]"
                  />
                  Non-stop only
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="stops"
                    value="1"
                    checked={filters.stops === "1"}
                    onChange={() => setFilters({ ...filters, stops: "1" })}
                    className="mr-2 accent-[#6d0ff2]"
                  />
                  1 Stop
                </label>
              </div>
            </div>

            {/* Departure Time */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Departure Time</h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  className={`p-2 text-sm rounded-md ${filters.departureTime === "morning" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
                  onClick={() => setFilters({ ...filters, departureTime: "morning" })}
                >
                  Morning
                </button>
                <button
                  className={`p-2 text-sm rounded-md ${filters.departureTime === "afternoon" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
                  onClick={() => setFilters({ ...filters, departureTime: "afternoon" })}
                >
                  Afternoon
                </button>
                <button
                  className={`p-2 text-sm rounded-md ${filters.departureTime === "evening" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
                  onClick={() => setFilters({ ...filters, departureTime: "evening" })}
                >
                  Evening
                </button>
                <button
                  className={`p-2 text-sm rounded-md ${filters.departureTime === "night" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
                  onClick={() => setFilters({ ...filters, departureTime: "night" })}
                >
                  Night
                </button>
              </div>
            </div>

            {/* Reset Filters */}
            <button
              className="w-full py-2 border border-[#003580] text-[#003580] rounded-md hover:bg-[#003580] hover:text-white transition-colors"
              onClick={() =>
                setFilters({
                  price: [0, 100000],
                  stops: "any",
                  airlines: [],
                  departureTime: "any",
                  arrivalTime: "any",
                })
              }
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Flight Results */}
        <div className="lg:w-3/4">
          <div className="space-y-4">
            {flights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                      <FaPlane className="text-[#003580] text-2xl" />
                    </div>
                    <div>
                      <div className="font-semibold">{flight.airline}</div>
                      <div className="text-sm text-gray-500">{flight.flightNumber}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    {/* Departure */}
                    <div className="text-center mb-4 md:mb-0">
                      <div className="text-2xl font-bold">{flight.departure.time}</div>
                      <div className="font-medium">{flight.departure.airport}</div>
                      <div className="text-sm text-gray-500">{flight.departure.city}</div>
                    </div>

                    {/* Flight Path */}
                    <div className="flex flex-col items-center mx-4 mb-4 md:mb-0">
                      <div className="text-sm text-gray-500">{flight.duration}</div>
                      <div className="relative w-32 md:w-48 h-0.5 bg-gray-300 my-2">
                        <div className="absolute -top-1.5 left-0 w-3 h-3 rounded-full bg-[#003580]"></div>
                        {flight.stops > 0 && (
                          <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-[#D21034]"></div>
                        )}
                        <div className="absolute -top-1.5 right-0 w-3 h-3 rounded-full bg-[#003580]"></div>
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.stops === 0 ? "Non-stop" : `${flight.stops} Stop`}
                      </div>
                    </div>

                    {/* Arrival */}
                    <div className="text-center mb-4 md:mb-0">
                      <div className="text-2xl font-bold">{flight.arrival.time}</div>
                      <div className="font-medium">{flight.arrival.airport}</div>
                      <div className="text-sm text-gray-500">{flight.arrival.city}</div>
                    </div>

                    {/* Price */}
                    <div className="text-center w-full md:w-auto">
                      <div className="text-2xl font-bold text-[#D21034]">NPR {flight.price.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">per passenger</div>
                      <button
                        className="mt-2 w-full bg-[#D21034] hover:bg-[#b50e2c] text-white py-2 px-6 rounded-md transition-colors"
                        onClick={() => handleSelectFlight(flight)}
                      >
                        Select
                      </button>
                    </div>
                  </div>

                  {/* Flight Details */}
                  <div className="flex flex-wrap justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <FaRegClock className="text-gray-500 mr-1" />
                        <span className="text-sm">{flight.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {flight.amenities.map((amenity, index) => (
                          <span key={index} title={amenity}>
                            {getAmenityIcon(amenity)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">{flight.seatsAvailable} seats left at this price</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightResults

