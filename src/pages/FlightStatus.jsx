

import { useState, useEffect } from "react"
import {
  FaPlane,
  FaSearch,
  FaCalendarAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaMapMarkerAlt,
  FaCloudSun,
  FaCloudRain,
  FaCloud,
  FaSnowflake,
  FaArrowRight,
  FaArrowUp,
  FaArrowDown,
  FaHistory,
  FaFilter,
  FaSun,
  FaBolt,
  FaShare,
} from "react-icons/fa"

const FlightStatus = () => {
  const [searchType, setSearchType] = useState("flightNumber")
  const [searchData, setSearchData] = useState({
    flightNumber: "",
    date: "",
    from: "",
    to: "",
  })
  const [searchResults, setSearchResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filterOptions, setFilterOptions] = useState({
    status: "all",
    sortBy: "departure",
  })
  const [recentSearches, setRecentSearches] = useState([
    { type: "flightNumber", value: "RA205", date: "2023-06-15" },
    { type: "route", from: "KTM", to: "DEL", date: "2023-06-15" },
  ])
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchData({
      ...searchData,
      [name]: value,
    })
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setSelectedFlight(null)

    // Simulate API call
    setTimeout(() => {
      // Mock flight status data
      const mockFlights = [
        {
          id: 1,
          flightNumber: "RA205",
          date: "2023-06-15",
          departure: {
            airport: "KTM",
            city: "Kathmandu",
            scheduledTime: "07:30",
            actualTime: "07:45",
            terminal: "T1",
            gate: "G3",
            status: "Departed",
            weather: {
              condition: "Partly Cloudy",
              temperature: "22°C",
              wind: "10 km/h",
              humidity: "65%",
              icon: "cloud-sun",
            },
          },
          arrival: {
            airport: "DEL",
            city: "Delhi",
            scheduledTime: "09:00",
            actualTime: "09:15",
            terminal: "T3",
            gate: "G12",
            status: "On Time",
            weather: {
              condition: "Sunny",
              temperature: "32°C",
              wind: "8 km/h",
              humidity: "45%",
              icon: "sun",
            },
          },
          aircraft: "Airbus A320",
          status: "In Air",
          altitude: "32,000 ft",
          speed: "850 km/h",
          progress: 65,
          flightPath: [
            { lat: 27.7172, lng: 85.324 }, // Kathmandu
            { lat: 28.5562, lng: 83.7897 }, // Midpoint 1
            { lat: 29.2345, lng: 81.5432 }, // Midpoint 2
            { lat: 28.6139, lng: 77.209 }, // Delhi
          ],
          updates: [
            { time: "07:00", status: "Boarding", message: "Boarding started at Gate G3" },
            { time: "07:30", status: "Scheduled Departure", message: "Scheduled departure time" },
            { time: "07:45", status: "Departed", message: "Aircraft departed from Kathmandu" },
            { time: "08:30", status: "In Air", message: "Cruising at 32,000 ft" },
            { time: "09:15", status: "Estimated Arrival", message: "Estimated arrival in Delhi" },
          ],
        },
        {
          id: 2,
          flightNumber: "RA405",
          date: "2023-06-15",
          departure: {
            airport: "KTM",
            city: "Kathmandu",
            scheduledTime: "14:45",
            actualTime: "14:45",
            terminal: "T1",
            gate: "G5",
            status: "On Time",
            weather: {
              condition: "Cloudy",
              temperature: "24°C",
              wind: "12 km/h",
              humidity: "70%",
              icon: "cloud",
            },
          },
          arrival: {
            airport: "DEL",
            city: "Delhi",
            scheduledTime: "16:15",
            actualTime: "16:15",
            terminal: "T3",
            gate: "G8",
            status: "On Time",
            weather: {
              condition: "Partly Cloudy",
              temperature: "34°C",
              wind: "6 km/h",
              humidity: "40%",
              icon: "cloud-sun",
            },
          },
          aircraft: "Airbus A320",
          status: "Scheduled",
          progress: 0,
          updates: [
            { time: "12:45", status: "Check-in Open", message: "Check-in counters open at Terminal T1" },
            { time: "14:15", status: "Boarding", message: "Boarding will start at Gate G5" },
            { time: "14:45", status: "Scheduled Departure", message: "Scheduled departure time" },
            { time: "16:15", status: "Scheduled Arrival", message: "Scheduled arrival in Delhi" },
          ],
        },
        {
          id: 3,
          flightNumber: "RA306",
          date: "2023-06-15",
          departure: {
            airport: "KTM",
            city: "Kathmandu",
            scheduledTime: "10:30",
            actualTime: "11:15",
            terminal: "T1",
            gate: "G2",
            status: "Delayed",
            weather: {
              condition: "Rain",
              temperature: "18°C",
              wind: "20 km/h",
              humidity: "85%",
              icon: "cloud-rain",
            },
          },
          arrival: {
            airport: "BKK",
            city: "Bangkok",
            scheduledTime: "13:45",
            actualTime: "14:30",
            terminal: "T2",
            gate: "G15",
            status: "Delayed",
            weather: {
              condition: "Thunderstorm",
              temperature: "30°C",
              wind: "25 km/h",
              humidity: "80%",
              icon: "cloud-lightning",
            },
          },
          aircraft: "Airbus A330",
          status: "Delayed",
          delay: "45 minutes",
          reason: "Weather conditions at departure airport",
          progress: 0,
          updates: [
            { time: "08:30", status: "Check-in Open", message: "Check-in counters open at Terminal T1" },
            { time: "10:00", status: "Delay Announced", message: "Flight delayed due to weather conditions" },
            { time: "10:30", status: "Scheduled Departure", message: "Original scheduled departure time" },
            { time: "11:15", status: "New Departure Time", message: "Updated departure time" },
            { time: "14:30", status: "New Arrival Time", message: "Updated arrival time in Bangkok" },
          ],
        },
      ]

      setSearchResults(mockFlights)
      setIsLoading(false)
    }, 1500)
  }

  const handleFlightSelect = (flight) => {
    setSelectedFlight(flight)
    // Scroll to flight details
    setTimeout(() => {
      document.getElementById("flight-details")?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "On Time":
        return "text-green-600"
      case "Delayed":
        return "text-yellow-600"
      case "Cancelled":
        return "text-red-600"
      case "Departed":
      case "In Air":
        return "text-blue-600"
      case "Arrived":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "On Time":
        return <FaCheckCircle className="text-green-600" />
      case "Delayed":
        return <FaExclamationTriangle className="text-yellow-600" />
      case "Cancelled":
        return <FaInfoCircle className="text-red-600" />
      case "Departed":
      case "In Air":
        return <FaPlane className="text-blue-600" />
      case "Arrived":
        return <FaCheckCircle className="text-green-600" />
      default:
        return <FaClock className="text-gray-600" />
    }
  }

  const getWeatherIcon = (icon) => {
    switch (icon) {
      case "sun":
        return <FaSun className="text-yellow-500" />
      case "cloud-sun":
        return <FaCloudSun className="text-gray-500" />
      case "cloud":
        return <FaCloud className="text-gray-500" />
      case "cloud-rain":
        return <FaCloudRain className="text-gray-500" />
      case "cloud-lightning":
        return <FaBolt className="text-yellow-500" />
      case "snow":
        return <FaSnowflake className="text-blue-300" />
      default:
        return <FaSun className="text-yellow-500" />
    }
  }

  // Filter and sort flights
  const getFilteredFlights = () => {
    if (!searchResults) return []

    let filtered = [...searchResults]

    // Filter by status
    if (filterOptions.status !== "all") {
      filtered = filtered.filter((flight) => flight.status.toLowerCase() === filterOptions.status)
    }

    // Sort flights
    filtered.sort((a, b) => {
      if (filterOptions.sortBy === "departure") {
        return a.departure.scheduledTime.localeCompare(b.departure.scheduledTime)
      } else if (filterOptions.sortBy === "arrival") {
        return a.arrival.scheduledTime.localeCompare(b.arrival.scheduledTime)
      } else if (filterOptions.sortBy === "flight") {
        return a.flightNumber.localeCompare(b.flightNumber)
      }
      return 0
    })

    return filtered
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Flight Status</h1>
      <p className="text-gray-600 mb-6">Track real-time status of Nepal Airlines flights</p>

      {/* Search Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex space-x-4 mb-6 overflow-x-auto">
          <button
            className={`px-4 py-2 rounded-md ${searchType === "flightNumber" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
            onClick={() => setSearchType("flightNumber")}
          >
            By Flight Number
          </button>
          <button
            className={`px-4 py-2 rounded-md ${searchType === "route" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
            onClick={() => setSearchType("route")}
          >
            By Route
          </button>
        </div>

        <form onSubmit={handleSearch}>
          {searchType === "flightNumber" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Flight Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="flightNumber"
                    value={searchData.flightNumber}
                    onChange={handleInputChange}
                    placeholder="e.g. RA205"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                    required
                  />
                  <FaPlane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={searchData.date}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                    required
                  />
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">From</label>
                <div className="relative">
                  <input
                    type="text"
                    name="from"
                    value={searchData.from}
                    onChange={handleInputChange}
                    placeholder="City or Airport"
                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                    required
                  />
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">To</label>
                <div className="relative">
                  <input
                    type="text"
                    name="to"
                    value={searchData.to}
                    onChange={handleInputChange}
                    placeholder="City or Airport"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                    required
                  />
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={searchData.date}
                    onChange={handleInputChange}
                     className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                    required
                  />
                  <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="bg-[#D21034] hover:bg-[#b50e2c] text-white px-6 py-3 rounded-md font-semibold flex items-center justify-center transition-colors"
            >
              <FaSearch className="mr-2" />
              Check Flight Status
            </button>

            {recentSearches.length > 0 && (
              <div className="relative group">
                <button
                  type="button"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors w-full md:w-auto"
                >
                  <FaHistory className="mr-2" />
                  Recent Searches
                </button>
                <div className="absolute left-0 mt-2 w-full md:w-64 bg-white rounded-md shadow-lg z-10 hidden group-hover:block">
                  <div className="p-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-sm"
                        onClick={() => {
                          if (search.type === "flightNumber") {
                            setSearchType("flightNumber")
                            setSearchData({
                              ...searchData,
                              flightNumber: search.value,
                              date: search.date,
                            })
                          } else {
                            setSearchType("route")
                            setSearchData({
                              ...searchData,
                              from: search.from,
                              to: search.to,
                              date: search.date,
                            })
                          }
                        }}
                      >
                        {search.type === "flightNumber" ? (
                          <span>
                            Flight {search.value} on {search.date}
                          </span>
                        ) : (
                          <span>
                            {search.from} to {search.to} on {search.date}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Search Results */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 border-4 border-t-[#D21034] border-r-[#D21034] border-b-[#D21034] border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for flight status...</p>
        </div>
      ) : searchResults ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-xl font-semibold">Flight Status Results</h2>

            <div className="flex items-center mt-2 md:mt-0">
              <button className="flex items-center text-[#003580] mr-4" onClick={() => setShowFilters(!showFilters)}>
                <FaFilter className="mr-1" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              <div className="text-sm text-gray-500">
                {currentTime.toLocaleTimeString()} • {currentTime.toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Filter by Status</label>
                  <select
                    name="status"
                    value={filterOptions.status}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in air">In Air</option>
                    <option value="delayed">Delayed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Sort By</label>
                  <select
                    name="sortBy"
                    value={filterOptions.sortBy}
                    onChange={handleFilterChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="departure">Departure Time</option>
                    <option value="arrival">Arrival Time</option>
                    <option value="flight">Flight Number</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    className="bg-[#003580] text-white px-4 py-2 rounded-md"
                    onClick={() =>
                      setFilterOptions({
                        status: "all",
                        sortBy: "departure",
                      })
                    }
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Flight List */}
          <div className="space-y-4">
            {getFilteredFlights().map((flight) => (
              <div
                key={flight.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedFlight?.id === flight.id ? "ring-2 ring-[#003580]" : ""}`}
                onClick={() => handleFlightSelect(flight)}
              >
                <div className="bg-[#003580] text-white p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <FaPlane className="mr-2" />
                      <span className="font-semibold">{flight.flightNumber}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">{flight.date}</span>
                      <span
                        className={`flex items-center px-3 py-1 rounded-full text-sm ${
                          flight.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : flight.status === "Delayed"
                              ? "bg-yellow-100 text-yellow-800"
                              : flight.status === "In Air"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                        }`}
                      >
                        {getStatusIcon(flight.status)}
                        <span className="ml-1">{flight.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    {/* Departure */}
                    <div className="mb-4 md:mb-0 md:w-5/12">
                      <div className="text-sm text-gray-500 mb-1">Departure</div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-2xl font-bold">{flight.departure.airport}</div>
                          <div className="text-gray-600">{flight.departure.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{flight.departure.actualTime}</div>
                          {flight.departure.scheduledTime !== flight.departure.actualTime && (
                            <div className="text-sm text-gray-500">Scheduled: {flight.departure.scheduledTime}</div>
                          )}
                          <div className={`text-sm font-medium ${getStatusColor(flight.departure.status)}`}>
                            {flight.departure.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Flight Path */}
                    <div className="flex flex-col items-center justify-center mb-4 md:mb-0 md:w-2/12">
                      <div className="relative w-full h-1 bg-gray-200 my-2">
                        <div
                          className="absolute top-0 left-0 h-full bg-[#003580]"
                          style={{ width: `${flight.progress || 0}%` }}
                        ></div>
                        <div className="absolute -top-1.5 left-0 w-3 h-3 rounded-full bg-[#003580]"></div>
                        <div
                          className="absolute -top-1.5 w-3 h-3 rounded-full bg-[#D21034]"
                          style={{ left: `${flight.progress || 0}%` }}
                        ></div>
                        <div className="absolute -top-1.5 right-0 w-3 h-3 rounded-full bg-[#003580]"></div>
                      </div>
                      <div className="text-xs text-gray-500">{flight.aircraft}</div>
                      {flight.status === "In Air" && (
                        <div className="mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {flight.progress}% Complete
                        </div>
                      )}
                    </div>

                    {/* Arrival */}
                    <div className="md:w-5/12">
                      <div className="text-sm text-gray-500 mb-1">Arrival</div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-2xl font-bold">{flight.arrival.airport}</div>
                          <div className="text-gray-600">{flight.arrival.city}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{flight.arrival.actualTime}</div>
                          {flight.arrival.scheduledTime !== flight.arrival.actualTime && (
                            <div className="text-sm text-gray-500">Scheduled: {flight.arrival.scheduledTime}</div>
                          )}
                          <div className={`text-sm font-medium ${getStatusColor(flight.arrival.status)}`}>
                            {flight.arrival.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {flight.delay && (
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                      <FaExclamationTriangle className="inline mr-2" />
                      Delayed by {flight.delay} due to {flight.reason}
                    </div>
                  )}

                  <div className="mt-3 text-sm text-gray-500 flex justify-between">
                    <div>
                      Terminal: {flight.departure.terminal} • Gate: {flight.departure.gate}
                    </div>
                    <button className="text-[#003580] font-medium hover:underline flex items-center">
                      View Details <FaArrowRight className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Detailed Flight View */}
      {selectedFlight && (
        <div id="flight-details" className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-[#003580] to-[#6d0ff2] text-white p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <div className="flex items-center">
                  <FaPlane className="mr-2 text-xl" />
                  <h2 className="text-2xl font-bold">{selectedFlight.flightNumber}</h2>
                </div>
                <div className="mt-1">
                  {selectedFlight.departure.city} to {selectedFlight.arrival.city} • {selectedFlight.date}
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    selectedFlight.status === "Cancelled"
                      ? "bg-red-100 text-red-800"
                      : selectedFlight.status === "Delayed"
                        ? "bg-yellow-100 text-yellow-800"
                        : selectedFlight.status === "In Air"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                  }`}
                >
                  {getStatusIcon(selectedFlight.status)}
                  <span className="ml-2">{selectedFlight.status}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Flight Tracker */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Flight Tracker</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="relative h-40 md:h-60 bg-blue-50 rounded-lg mb-4 overflow-hidden">
                  {/* This would be a map in a real implementation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/placeholder.svg?height=240&width=800"
                      alt="Flight Path Map"
                      className="w-full h-full object-cover"
                    />

                    {/* Flight Progress Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-3/4 h-1 bg-gray-300">
                        <div
                          className="absolute top-0 left-0 h-full bg-[#003580]"
                          style={{ width: `${selectedFlight.progress || 0}%` }}
                        ></div>
                        <div className="absolute -top-2 left-0 flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-[#003580]"></div>
                          <div className="text-xs font-medium mt-1">{selectedFlight.departure.airport}</div>
                        </div>
                        {selectedFlight.status === "In Air" && (
                          <div
                            className="absolute -top-3 flex flex-col items-center"
                            style={{ left: `${selectedFlight.progress || 0}%` }}
                          >
                            <div className="w-6 h-6 rounded-full bg-[#D21034] flex items-center justify-center">
                              <FaPlane className="text-white text-xs" />
                            </div>
                          </div>
                        )}
                        <div className="absolute -top-2 right-0 flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full bg-[#003580]"></div>
                          <div className="text-xs font-medium mt-1">{selectedFlight.arrival.airport}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedFlight.status === "In Air" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <div className="text-sm text-gray-500">Altitude</div>
                      <div className="font-bold">{selectedFlight.altitude}</div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <div className="text-sm text-gray-500">Speed</div>
                      <div className="font-bold">{selectedFlight.speed}</div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <div className="text-sm text-gray-500">Distance Traveled</div>
                      <div className="font-bold">{selectedFlight.progress}%</div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm">
                      <div className="text-sm text-gray-500">Estimated Arrival</div>
                      <div className="font-bold">{selectedFlight.arrival.actualTime}</div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col md:flex-row justify-between">
                  {/* Departure Details */}
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <FaArrowUp className="text-[#003580] mr-2" />
                      <h4 className="font-medium">Departure</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Airport:</span> {selectedFlight.departure.airport}
                      </div>
                      <div>
                        <span className="text-gray-500">City:</span> {selectedFlight.departure.city}
                      </div>
                      <div>
                        <span className="text-gray-500">Terminal:</span> {selectedFlight.departure.terminal}
                      </div>
                      <div>
                        <span className="text-gray-500">Gate:</span> {selectedFlight.departure.gate}
                      </div>
                      <div>
                        <span className="text-gray-500">Scheduled:</span> {selectedFlight.departure.scheduledTime}
                      </div>
                      <div>
                        <span className="text-gray-500">Actual:</span> {selectedFlight.departure.actualTime}
                      </div>
                    </div>

                    {/* Weather at Departure */}
                    <div className="mt-3 flex items-center bg-blue-50 p-2 rounded-md">
                      {getWeatherIcon(selectedFlight.departure.weather?.icon)}
                      <div className="ml-2 text-sm">
                        <div>{selectedFlight.departure.weather?.condition}</div>
                        <div className="text-xs text-gray-500">
                          {selectedFlight.departure.weather?.temperature} • Wind:{" "}
                          {selectedFlight.departure.weather?.wind}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrival Details */}
                  <div>
                    <div className="flex items-center mb-2">
                      <FaArrowDown className="text-[#D21034] mr-2" />
                      <h4 className="font-medium">Arrival</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Airport:</span> {selectedFlight.arrival.airport}
                      </div>
                      <div>
                        <span className="text-gray-500">City:</span> {selectedFlight.arrival.city}
                      </div>
                      <div>
                        <span className="text-gray-500">Terminal:</span> {selectedFlight.arrival.terminal}
                      </div>
                      <div>
                        <span className="text-gray-500">Gate:</span> {selectedFlight.arrival.gate}
                      </div>
                      <div>
                        <span className="text-gray-500">Scheduled:</span> {selectedFlight.arrival.scheduledTime}
                      </div>
                      <div>
                        <span className="text-gray-500">Estimated:</span> {selectedFlight.arrival.actualTime}
                      </div>
                    </div>

                    {/* Weather at Arrival */}
                    <div className="mt-3 flex items-center bg-blue-50 p-2 rounded-md">
                      {getWeatherIcon(selectedFlight.arrival.weather?.icon)}
                      <div className="ml-2 text-sm">
                        <div>{selectedFlight.arrival.weather?.condition}</div>
                        <div className="text-xs text-gray-500">
                          {selectedFlight.arrival.weather?.temperature} • Wind: {selectedFlight.arrival.weather?.wind}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Flight Status Timeline */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Flight Status Timeline</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6 pl-12">
                  {selectedFlight.updates.map((update, index) => (
                    <div key={index} className="relative">
                      <div
                        className={`absolute left-0 top-0 -translate-x-4 w-8 h-8 rounded-full flex items-center justify-center ${
                          index === selectedFlight.updates.length - 1
                            ? "bg-[#003580] text-white"
                            : index === 0
                              ? "bg-[#D21034] text-white"
                              : "bg-gray-100"
                        }`}
                      >
                        {index === 0 ? (
                          <FaPlane className="text-sm" />
                        ) : index === selectedFlight.updates.length - 1 ? (
                          <FaCheckCircle className="text-sm" />
                        ) : (
                          <FaClock className="text-gray-500 text-sm" />
                        )}
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="font-medium">{update.status}</div>
                        <div className="text-sm text-gray-500">
                          {update.time} • {update.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Aircraft Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Aircraft Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-video bg-white rounded-md flex items-center justify-center mb-3">
                    <img
                      src="/placeholder.svg?height=200&width=400"
                      alt={selectedFlight.aircraft}
                      className="max-h-full max-w-full"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{selectedFlight.aircraft}</div>
                    <div className="text-sm text-gray-500">Registration: 9N-ALM</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Aircraft Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Aircraft Type:</span>
                      <span>Airbus A320-200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Age:</span>
                      <span>5.2 years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Seating Capacity:</span>
                      <span>158 passengers</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Range:</span>
                      <span>6,100 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cruising Speed:</span>
                      <span>840 km/h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <button className="bg-[#003580] hover:bg-[#002a66] text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center">
                <FaPlane className="mr-2" />
                Check-in Online
              </button>
              <button className="bg-[#D21034] hover:bg-[#b50e2c] text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center">
                <FaCalendarAlt className="mr-2" />
                Manage Booking
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-md font-medium transition-colors flex items-center">
                <FaShare className="mr-2" />
                Share Flight Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Flight Status Information */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Flight Status Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
              <FaCheckCircle className="text-xl" />
            </div>
            <h3 className="font-medium mb-2">On Time</h3>
            <p className="text-sm text-gray-600">Flight is scheduled to depart and arrive as planned.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-3">
              <FaExclamationTriangle className="text-xl" />
            </div>
            <h3 className="font-medium mb-2">Delayed</h3>
            <p className="text-sm text-gray-600">Flight departure or arrival is later than scheduled time.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <FaPlane className="text-xl" />
            </div>
            <h3 className="font-medium mb-2">In Air</h3>
            <p className="text-sm text-gray-600">Flight has departed and is currently en route to its destination.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
              <FaInfoCircle className="text-xl" />
            </div>
            <h3 className="font-medium mb-2">Cancelled</h3>
            <p className="text-sm text-gray-600">Flight has been cancelled and will not operate.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlightStatus

