

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPlane, FaExchangeAlt, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaSearch } from "react-icons/fa"
import PromotionCard from "../components/PromotionCard"
import DestinationCard from "../components/DestinationCard"

const HomePage = ({ setSearchParams }) => {
  const navigate = useNavigate()
  const [tripType, setTripType] = useState("roundTrip")
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: "economy",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchData({
      ...searchData,
      [name]: value,
    })
  }

  const handlePassengerChange = (type, operation) => {
    const currentValue = searchData.passengers[type]
    const newValue = operation === "add" ? currentValue + 1 : Math.max(0, currentValue - 1)

    // Ensure at least 1 adult
    if (type === "adults" && newValue < 1) return

    setSearchData({
      ...searchData,
      passengers: {
        ...searchData.passengers,
        [type]: newValue,
      },
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearchParams(searchData)
    navigate("/flights")
  }

  const swapLocations = () => {
    setSearchData({
      ...searchData,
      from: searchData.to,
      to: searchData.from,
    })
  }

  const promotions = [
    {
      id: 1,
      title: "Summer Special to Dubai",
      description: "Enjoy special fares to Dubai this summer season",
      price: "NPR 42,500",
      image: "https://imgs.search.brave.com/3u-ZNcVTAOehv_sM_guHpgTWxR6YiPkMnialUvKpXvc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzQ0LzE1LzM5/LzM2MF9GXzE0NDE1/Mzk0OV9GRExITHk3/ZFRpU1NnVlBCUlcz/UTY2MGRwQ0lzRkJa/TC5qcGc",
      discount: "20%",
    },
    {
      id: 2,
      title: "Weekend Getaway to Delhi",
      description: "Perfect weekend escape with our special fares",
      price: "NPR 18,900",
      image: "https://imgs.search.brave.com/v-Z4XvbpjHmydNjKBNGibkjDPS3ySYAlPlxkTZsoLAA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5oc3dzdGF0aWMu/Y29tL2V5SmlkV05y/WlhRaU9pSmpiMjUw/Wlc1MExtaHpkM04w/WVhScFl5NWpiMjBp/TENKclpYa2lPaUpu/YVdaY0wyeGhjMlZ5/TFhCdmFXNTBaWEl0/Y0d4aGJtVXRiM0pw/WjJsdVlXd3VhbkJu/SWl3aVpXUnBkSE1p/T25zaWNtVnphWHBs/SWpwN0luZHBaSFJv/SWpvMk1EQjlmWDA9",
      discount: "15%",
    },
    {
      id: 3,
      title: "Business Class Promotion",
      description: "Upgrade your journey with premium comfort",
      price: "NPR 85,000",
      image: "https://imgs.search.brave.com/g7DrINKwz8k9c-TZJ79zBrE9xF3cZeuHskdtMe4mY-8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzcwLzg2LzUx/LzM2MF9GXzI3MDg2/NTEwNF9ITXBtalAz/SHF0ME12ZGxWN1Fr/UUpmdWw1MGJCemo0/Ni5qcGc",
      discount: "10%",
    },
  ]

  const destinations = [
    {
      id: 1,
      name: "Kathmandu",
      country: "Nepal",
      image: "https://imgs.search.brave.com/sMz-5dy_T_oSyG28bSARpoFzd5yW_lxdKaqcZC6tF_c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTIx/NDIwNDY4L3Bob3Rv/L2JvdWRoYW5hdGgt/c3R1cGEta2F0aG1h/bmR1LW5lcGFsLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz15/eW9qdEFKSFhmbmE4/dEJNcnhZdDlyT0Zh/c1dqS052TFJmYjM4/eVlEUjBBPQ",
      price: "NPR 15,500",
    },
    {
      id: 2,
      name: "Delhi",
      country: "India",
      image: "https://imgs.search.brave.com/dloeqfxDywHdZKpiY-WdFBK4EyYyHm3AtVKwvQevIEc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTA2/ODEyNjQxL3Bob3Rv/L2luZGlhLWdhdGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PTNaeEpnUUFjRTZV/V3E2emY5T05kZnBE/cHdDeU45aUo1dkRM/RVFOYVZGUm89",
      price: "NPR 18,900",
    },
    {
      id: 3,
      name: "Bangkok",
      country: "Thailand",
      image: "https://imgs.search.brave.com/JQBOEhi6sCx_343kSspR0AxSIrPRpDIdBZEsUjbXoNc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzAxLzcwLzA4Lzc2/LzM2MF9GXzE3MDA4/NzYyM19BbzdQQW1M/MjJMeUpaU1FMYjYw/ZXA2NHhqbDhQZXZy/Zi5qcGc",
      price: "NPR 32,500",
    },
    {
      id: 4,
      name: "Dubai",
      country: "UAE",
      image: "https://imgs.search.brave.com/zIEZjU1k_cA7jBceA8XcJ4bMndQSG_VtP4Re21VVH-k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU0/OTE4MjExL3Bob3Rv/L2NpdHktb2YtZHVi/YWktYnVyai1raGFs/aWZhLmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1JUTF1cEpH/bG5JU3FyQmNCcG1E/UzhIVEN3LXU2ajA4/R2tyRndWMlFFTVFr/PQ",
      price: "NPR 42,500",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://imgs.search.brave.com/Lvxr1rJwfLZXjEzvNJOudnXYed0IQlzdPz6RMmU2N3g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzEwLzYyLzg5LzI0/LzM2MF9GXzEwNjI4/OTI0MDlfNTZvUGRl/NG9RZHV4M3NwRkFD/NXdmM0s2Y3UxOTBS/cmcuanBn')" }}
      >
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover the Beauty of Nepal and Beyond</h1>
            <p className="text-xl md:text-2xl mb-8">
              Experience exceptional service and comfort with Nepal's flag carrier
            </p>
          </div>
        </div>
      </section>

      {/* Search Widget */}
      <section className="container mx-auto px-4 -mt-24 relative z-10 mb-16">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded-md ${tripType === "roundTrip" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
              onClick={() => setTripType("roundTrip")}
            >
              Round Trip
            </button>
            <button
              className={`px-4 py-2 rounded-md ${tripType === "oneWay" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
              onClick={() => setTripType("oneWay")}
            >
              One Way
            </button>
            <button
              className={`px-4 py-2 rounded-md ${tripType === "multiCity" ? "bg-[#003580] text-white" : "bg-gray-100"}`}
              onClick={() => setTripType("multiCity")}
            >
              Multi-City
            </button>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* From & To */}
              <div className="relative flex bg-gray-50 rounded-lg">
                <div className="flex-1 p-3">
                  <label className="block text-sm text-gray-500 mb-1">
                    <FaMapMarkerAlt className="inline mr-2 text-[#D21034]" />
                    From
                  </label>
                  <input
                    type="text"
                    name="from"
                    value={searchData.from}
                    onChange={handleInputChange}
                    placeholder="City or Airport"
                    className="w-full bg-transparent border-none focus:outline-none text-lg"
                    required
                  />
                </div>
                <button
                type="button"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-[#003580] text-white hover:bg-[#00274d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003580]"
                onClick={swapLocations}
              >
                <FaExchangeAlt />
              </button>
                <div className="flex-1 p-3">
                  <label className="block text-sm text-gray-500 mb-1">
                    <FaMapMarkerAlt className="inline mr-2 text-[#D21034]" />
                    To
                  </label>
                  <input
                    type="text"
                    name="to"
                    value={searchData.to}
                    onChange={handleInputChange}
                    placeholder="City or Airport"
                    className="w-full bg-transparent border-none focus:outline-none text-lg"
                    required
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="block text-sm text-gray-500 mb-1">
                  <FaCalendarAlt className="inline mr-2 text-[#D21034]" />
                  Departure Date
                </label>
                <input
                  type="date"
                  name="departDate"
                  value={searchData.departDate}
                  onChange={handleInputChange}
                  className="w-full bg-transparent border-none focus:outline-none text-lg"
                  required
                />
              </div>

              {tripType === "roundTrip" && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <label className="block text-sm text-gray-500 mb-1">
                    <FaCalendarAlt className="inline mr-2 text-[#D21034]" />
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={searchData.returnDate}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-none focus:outline-none text-lg"
                    required={tripType === "roundTrip"}
                  />
                </div>
              )}

              {/* Passengers & Class */}
              <div className="bg-gray-50 rounded-lg p-3">
                <label className="block text-sm text-gray-500 mb-1">
                  <FaUser className="inline mr-2 text-[#D21034]" />
                  Passengers & Class
                </label>
                <div className="flex justify-between">
                  <div className="text-lg">
                    {searchData.passengers.adults + searchData.passengers.children + searchData.passengers.infants}{" "}
                    Passenger(s)
                  </div>
                  <select
                    name="cabinClass"
                    value={searchData.cabinClass}
                    onChange={handleInputChange}
                    className="bg-transparent border-none focus:outline-none"
                  >
                    <option value="economy">Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Passenger Details (Expandable) */}
            <div className="mb-6 bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-3">Passenger Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex justify-between items-center">
                  <span>Adults (12+ years)</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      onClick={() => handlePassengerChange("adults", "subtract")}
                    >
                      -
                    </button>
                    <span>{searchData.passengers.adults}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      onClick={() => handlePassengerChange("adults", "add")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Children (2-11 years)</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      onClick={() => handlePassengerChange("children", "subtract")}
                    >
                      -
                    </button>
                    <span>{searchData.passengers.children}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      onClick={() => handlePassengerChange("children", "add")}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Infants (0-23 months)</span>
                  <div className="flex items-center space-x-3">
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      onClick={() => handlePassengerChange("infants", "subtract")}
                    >
                      -
                    </button>
                    <span>{searchData.passengers.infants}</span>
                    <button
                      type="button"
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      onClick={() => handlePassengerChange("infants", "add")}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full md:w-auto md:px-12 py-3 bg-[#D21034] hover:bg-[#b50e2c] text-white font-bold rounded-lg flex items-center justify-center transition-colors"
            >
              <FaSearch className="mr-2" />
              Search Flights
            </button>
          </form>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="section-title">Special Offers & Promotions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <PromotionCard key={promo.id} promotion={promo} />
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="container mx-auto px-4 mb-16">
        <h2 className="section-title">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-12">Why Fly With Nepal Airlines?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#003580] text-white flex items-center justify-center mx-auto mb-4">
                <FaPlane size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Fleet</h3>
              <p className="text-gray-600">Experience comfort and safety with our modern aircraft fleet.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#D21034] text-white flex items-center justify-center mx-auto mb-4">
                <FaUser size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nepali Hospitality</h3>
              <p className="text-gray-600">Experience the warmth and hospitality that Nepal is famous for.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#6d0ff2] text-white flex items-center justify-center mx-auto mb-4">
                <FaMapMarkerAlt size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Extensive Network</h3>
              <p className="text-gray-600">Connect to destinations across Asia and beyond with our growing network.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#FFD700] text-[#003580] flex items-center justify-center mx-auto mb-4">
                <FaCalendarAlt size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Booking</h3>
              <p className="text-gray-600">Enjoy peace of mind with our flexible booking options and policies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 mb-16">
        <div className="bg-[#003580] text-white rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="mb-6">Stay updated with our latest offers, flight schedules, and travel tips.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <button className="bg-[#D21034] hover:bg-[#b50e2c] px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

