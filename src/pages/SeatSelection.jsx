
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaPlane, FaArrowRight, FaUser } from "react-icons/fa"

const SeatSelection = ({ selectedFlight, selectedSeats, setSelectedSeats }) => {
  const navigate = useNavigate()
  const [currentPassenger, setCurrentPassenger] = useState(0)

  // Mock data for seat map
  const seatMap = {
    rows: 20,
    columns: ["A", "B", "C", "", "D", "E", "F"],
    unavailableSeats: ["1A", "1F", "5C", "5D", "8A", "8B", "12E", "12F", "15C", "15D", "18A"],
    premiumRows: [1, 2, 3, 4],
    exitRows: [10, 11],
  }

  const handleSeatSelect = (seat) => {
    // Check if seat is already selected
    const seatIndex = selectedSeats.findIndex((s) => s.seat === seat)

    if (seatIndex >= 0) {
      // Remove seat if already selected
      const newSelectedSeats = [...selectedSeats]
      newSelectedSeats.splice(seatIndex, 1)
      setSelectedSeats(newSelectedSeats)
    } else {
      // Add seat if not selected and we haven't selected all passengers yet
      if (selectedSeats.length < (selectedFlight?.passengers?.adults || 1)) {
        setSelectedSeats([
          ...selectedSeats,
          {
            seat,
            passenger: `Passenger ${selectedSeats.length + 1}`,
            isPremium: seatMap.premiumRows.includes(Number.parseInt(seat.match(/\d+/)[0])),
          },
        ])

        // Move to next passenger
        if (currentPassenger < (selectedFlight?.passengers?.adults || 1) - 1) {
          setCurrentPassenger(currentPassenger + 1)
        }
      }
    }
  }

  const isSeatSelected = (seat) => {
    return selectedSeats.some((s) => s.seat === seat)
  }

  const isSeatUnavailable = (seat) => {
    return seatMap.unavailableSeats.includes(seat)
  }

  const isPremiumSeat = (rowNum) => {
    return seatMap.premiumRows.includes(rowNum)
  }

  const isExitRow = (rowNum) => {
    return seatMap.exitRows.includes(rowNum)
  }

  const getSeatPrice = (rowNum) => {
    if (isPremiumSeat(rowNum)) return 1200
    if (isExitRow(rowNum)) return 800
    return 500
  }

  const handleContinue = () => {
    if (selectedSeats.length === (selectedFlight?.passengers?.adults || 1)) {
      navigate("/payment")
    }
  }

  const renderSeatMap = () => {
    const rows = []

    // Add header row with column labels
    rows.push(
      <div key="header" className="flex justify-center mb-4">
        {seatMap.columns.map((col, index) => (
          <div key={`header-${index}`} className="w-10 h-10 flex items-center justify-center font-bold">
            {col}
          </div>
        ))}
      </div>,
    )

    // Add seat rows
    for (let i = 1; i <= seatMap.rows; i++) {
      const rowCells = []

      // Add row number
      rowCells.push(
        <div key={`row-${i}`} className="w-10 h-10 flex items-center justify-center font-bold mr-2">
          {i}
        </div>,
      )

      // Add seats in the row
      seatMap.columns.forEach((col, index) => {
        if (col === "") {
          // Aisle
          rowCells.push(
            <div key={`aisle-${i}-${index}`} className="w-10 h-10 flex items-center justify-center">
              {i === 1 && <FaPlane className="text-gray-400 rotate-90" />}
            </div>,
          )
        } else {
          const seatId = `${i}${col}`
          const isSelected = isSeatSelected(seatId)
          const isUnavailable = isSeatUnavailable(seatId)
          const isPremium = isPremiumSeat(i)
          const isExit = isExitRow(i)

          let seatClass = "w-10 h-10 rounded-md flex items-center justify-center cursor-pointer m-1 "

          if (isSelected) {
            seatClass += "bg-[#D21034] text-white"
          } else if (isUnavailable) {
            seatClass += "bg-gray-300 text-gray-500 cursor-not-allowed"
          } else if (isPremium) {
            seatClass += "bg-[#FFD700] text-[#003580] hover:bg-[#003580] hover:text-white"
          } else if (isExit) {
            seatClass += "bg-[#6d0ff2] text-white hover:bg-[#003580]"
          } else {
            seatClass += "bg-[#003580] text-white hover:bg-[#D21034]"
          }

          rowCells.push(
            <div
              key={seatId}
              className={seatClass}
              onClick={() => !isUnavailable && handleSeatSelect(seatId)}
              title={`Seat ${seatId} - NPR ${getSeatPrice(i)}`}
            >
              {col}
            </div>,
          )
        }
      })

      rows.push(
        <div
          key={`row-container-${i}`}
          className={`flex items-center mb-1 ${isExitRow(i) ? "border-t-2 border-b-2 border-dashed border-gray-400 py-2 my-2" : ""}`}
        >
          {rowCells}
        </div>,
      )
    }

    return rows
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Select Your Seats</h1>

      {/* Flight Info */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="font-semibold text-lg">{selectedFlight?.airline || "Nepal Airlines"}</h2>
            <div className="text-gray-600">{selectedFlight?.flightNumber || "RA205"}</div>
          </div>
          <div className="flex items-center mt-2 md:mt-0">
            <div className="text-center">
              <div className="font-bold">{selectedFlight?.departure?.time || "07:30"}</div>
              <div className="text-sm">{selectedFlight?.departure?.airport || "KTM"}</div>
            </div>
            <div className="mx-4 flex flex-col items-center">
              <div className="text-xs text-gray-500">{selectedFlight?.duration || "1h 30m"}</div>
              <div className="w-20 h-px bg-gray-300 my-1 relative">
                <div className="absolute -top-1 left-0 w-2 h-2 rounded-full bg-[#003580]"></div>
                <div className="absolute -top-1 right-0 w-2 h-2 rounded-full bg-[#003580]"></div>
              </div>
              <div className="text-xs text-gray-500">Non-stop</div>
            </div>
            <div className="text-center">
              <div className="font-bold">{selectedFlight?.arrival?.time || "09:00"}</div>
              <div className="text-sm">{selectedFlight?.arrival?.airport || "DEL"}</div>
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <div className="text-lg font-bold text-[#D21034]">
              NPR {selectedFlight?.price?.toLocaleString() || "18,900"}
            </div>
            <div className="text-sm text-gray-500">per passenger</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Seat Map */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Cabin Map</h2>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#003580] rounded-md mr-2"></div>
                <span className="text-sm">Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#D21034] rounded-md mr-2"></div>
                <span className="text-sm">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-gray-300 rounded-md mr-2"></div>
                <span className="text-sm">Unavailable</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#FFD700] rounded-md mr-2"></div>
                <span className="text-sm">Premium (NPR 1,200)</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-[#6d0ff2] rounded-md mr-2"></div>
                <span className="text-sm">Exit Row (NPR 800)</span>
              </div>
            </div>

            {/* Seat Map */}
            <div className="flex justify-center mb-8">
              <div className="inline-block">{renderSeatMap()}</div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Instructions:</h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>Click on a seat to select it for the current passenger</li>
                <li>Exit row seats require you to assist in case of emergency</li>
                <li>Premium seats offer extra legroom and priority boarding</li>
                <li>You must select {selectedFlight?.passengers?.adults || 1} seat(s)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Passenger Selection */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>

            {/* Current Passenger */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <FaUser className="text-[#003580] mr-2" />
                <h3 className="font-medium">Current Selection For:</h3>
              </div>
              <div className="bg-[#003580] text-white p-3 rounded-md">
                Passenger {currentPassenger + 1} of {selectedFlight?.passengers?.adults || 1}
              </div>
            </div>

            {/* Selected Seats */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Selected Seats:</h3>
              {selectedSeats.length > 0 ? (
                <div className="space-y-3">
                  {selectedSeats.map((seat, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#D21034] text-white rounded-md flex items-center justify-center mr-3">
                          {seat.seat}
                        </div>
                        <div>
                          <div className="font-medium">{seat.passenger}</div>
                          <div className="text-xs text-gray-500">
                            {seat.isPremium ? "Premium Seat" : "Standard Seat"}
                          </div>
                        </div>
                      </div>
                      <div className="font-medium">NPR {seat.isPremium ? "1,200" : "500"}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic">No seats selected yet</div>
              )}
            </div>

            {/* Summary */}
            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span>Base Fare ({selectedFlight?.passengers?.adults || 1} passenger):</span>
                <span>
                  NPR {((selectedFlight?.price || 18900) * (selectedFlight?.passengers?.adults || 1)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Seat Selection:</span>
                <span>
                  NPR {selectedSeats.reduce((total, seat) => total + (seat.isPremium ? 1200 : 500), 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Total:</span>
                <span>
                  NPR{" "}
                  {(
                    (selectedFlight?.price || 18900) * (selectedFlight?.passengers?.adults || 1) +
                    selectedSeats.reduce((total, seat) => total + (seat.isPremium ? 1200 : 500), 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>

            <button
              className={`w-full py-3 rounded-md flex items-center justify-center ${
                selectedSeats.length === (selectedFlight?.passengers?.adults || 1)
                  ? "bg-[#D21034] hover:bg-[#b50e2c] text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
              onClick={handleContinue}
              disabled={selectedSeats.length !== (selectedFlight?.passengers?.adults || 1)}
            >
              Continue to Payment <FaArrowRight className="ml-2" />
            </button>

            <div className="mt-4 text-sm text-gray-500 text-center">
              {selectedSeats.length} of {selectedFlight?.passengers?.adults || 1} seats selected
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatSelection

