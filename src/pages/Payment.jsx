import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlane,
  FaCreditCard,
  FaLock,
  FaUser,
  FaCalendarAlt,
  FaGooglePay,
  FaApplePay,
} from "react-icons/fa";

// Payment method logo URLs
const paymentLogos = {
  esewa: "https://imgs.search.brave.com/yQPbWkmKpdjqToO8mj-GzIX8FLaIB2DLs5iyuBnDAow/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bnRjLm5ldC5ucC9f/bnV4dC9pbWcvZXNl/d2FfbG9nby40MjQx/OWFhLnBuZw",
  paypal: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png",
  khalti: "https://imgs.search.brave.com/TMzKvYwLSdRtDIiA07vJ_i6iheNvViDs3XTVftJ0L2o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93aGF0/dGhlbG9nby5jb20v/c3RvcmFnZS9sb2dv/cy9raGFsdGktZGln/aXRhbC13YWxsZXQt/MTEzNDQwLnBuZw",
  creditCard: "https://cdn-icons-png.flaticon.com/512/179/179457.png",
  debitCard: "https://cdn-icons-png.flaticon.com/512/179/179457.png"
};

const Payment = ({ selectedFlight, selectedSeats }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    saveCard: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/confirmation");
    }, 2000);
  };

  // Calculate total price
  const basePrice = (selectedFlight?.price || 18900) * (selectedFlight?.passengers?.adults || 1);
  const seatPrice =
    selectedSeats?.reduce((total, seat) => {
      return total + (seat.isPremium ? 1200 : 500);
    }, 0) || 0;
  const taxes = Math.round(basePrice * 0.13); // 13% tax
  const totalPrice = basePrice + seatPrice + taxes;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Payment</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Payment Form */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            {/* Payment Method Selection */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <button
                className={`p-4 border rounded-md flex flex-col items-center justify-center ${
                  paymentMethod === "creditCard" ? "border-[#003580] bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("creditCard")}
              >
                <img 
                  src={paymentLogos.creditCard} 
                  alt="Credit Card" 
                  className={`h-6 mb-2 ${paymentMethod === "creditCard" ? "opacity-100" : "opacity-50"}`}
                />
                <span className={paymentMethod === "creditCard" ? "text-[#003580] font-medium" : "text-gray-500"}>
                  Credit Card
                </span>
              </button>
              <button
                className={`p-4 border rounded-md flex flex-col items-center justify-center ${
                  paymentMethod === "debitCard" ? "border-[#003580] bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("debitCard")}
              >
                <img 
                  src={paymentLogos.debitCard} 
                  alt="Debit Card" 
                  className={`h-6 mb-2 ${paymentMethod === "debitCard" ? "opacity-100" : "opacity-50"}`}
                />
                <span className={paymentMethod === "debitCard" ? "text-[#003580] font-medium" : "text-gray-500"}>
                  Debit Card
                </span>
              </button>
              <button
                className={`p-4 border rounded-md flex flex-col items-center justify-center ${
                  paymentMethod === "paypal" ? "border-[#003580] bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <img 
                  src={paymentLogos.paypal} 
                  alt="PayPal" 
                  className={`h-6 mb-2 ${paymentMethod === "paypal" ? "opacity-100" : "opacity-50"}`}
                />
                <span className={paymentMethod === "paypal" ? "text-[#003580] font-medium" : "text-gray-500"}>
                  PayPal
                </span>
              </button>
              <button
                className={`p-4 border rounded-md flex flex-col items-center justify-center ${
                  paymentMethod === "esewa" ? "border-[#003580] bg-blue-50" : "border-gray-200"
                }`}
                onClick={() => setPaymentMethod("esewa")}
              >
                <img 
                  src={paymentLogos.esewa} 
                  alt="eSewa" 
                  className={`h-6 mb-2 ${paymentMethod === "esewa" ? "opacity-100" : "opacity-50"}`}
                />
                <span className={paymentMethod === "esewa" ? "text-[#003580] font-medium" : "text-gray-500"}>
                  eSewa
                </span>
              </button>
            </div>

            {/* Credit/Debit Card Form */}
            {(paymentMethod === "creditCard" || paymentMethod === "debitCard") && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                      required
                      maxLength="19"
                    />
                    <FaCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">Cardholder Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                      required
                    />
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Expiry Date</label>
                    <div className="relative">
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                        required
                        maxLength="5"
                      />
                      <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">CVV</label>
                    <div className="relative">
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#003580] focus:border-[#003580]"
                        required
                        maxLength="3"
                      />
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveCard"
                      checked={formData.saveCard}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-[#003580] focus:ring-[#003580]"
                    />
                    <span className="ml-2 text-sm text-gray-700">Save card for future payments</span>
                  </label>
                </div>

                <div className="flex items-center justify-center mb-4 text-sm text-gray-600">
                  <FaLock className="mr-2 text-[#003580]" />
                  <span>Your payment information is secure with 256-bit SSL encryption</span>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-md font-semibold ${
                    isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-[#D21034] hover:bg-[#b50e2c] text-white"
                  }`}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Pay NPR ${totalPrice.toLocaleString()}`}
                </button>
              </form>
            )}

            {/* PayPal Payment */}
            {paymentMethod === "paypal" && (
              <div className="text-center py-8">
                <img src={paymentLogos.paypal} alt="PayPal" className="h-10 mx-auto mb-4" />
                <p className="mb-6">You will be redirected to PayPal to complete your payment.</p>
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-md font-semibold bg-[#003580] hover:bg-[#002a66] text-white"
                >
                  Continue to PayPal
                </button>
              </div>
            )}

            {/* eSewa Payment */}
            {paymentMethod === "esewa" && (
              <div className="text-center py-8">
                <img src={paymentLogos.esewa} alt="eSewa" className="h-10 mx-auto mb-4" />
                <p className="mb-6">You will be redirected to eSewa to complete your payment.</p>
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-md font-semibold bg-[#003580] hover:bg-[#002a66] text-white"
                >
                  Continue to eSewa
                </button>
              </div>
            )}
          </div>

          {/* Additional Payment Options */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-semibold mb-4">More Payment Options</h3>
            <div className="grid grid-cols-3 gap-4">
              <button className="p-3 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50">
                <FaGooglePay className="text-2xl" />
              </button>
              <button className="p-3 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50">
                <FaApplePay className="text-2xl" />
              </button>
              <button className="p-3 border border-gray-200 rounded-md flex items-center justify-center hover:bg-gray-50">
                <img src={paymentLogos.khalti} alt="Khalti" className="h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary (unchanged from your original code) */}
       {/* Order Summary */}
       <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

            {/* Flight Details */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                  <FaPlane className="text-[#003580]" />
                </div>
                <div>
                  <div className="font-semibold">{selectedFlight?.airline || "Nepal Airlines"}</div>
                  <div className="text-sm text-gray-500">{selectedFlight?.flightNumber || "RA205"}</div>
                </div>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <div>
                  <div className="font-medium">{selectedFlight?.departure?.time || "07:30"}</div>
                  <div className="text-gray-500">{selectedFlight?.departure?.date || "2023-06-15"}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-500">{selectedFlight?.duration || "1h 30m"}</div>
                  <div className="w-16 h-px bg-gray-300 my-1"></div>
                  <div className="text-xs text-gray-500">Non-stop</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{selectedFlight?.arrival?.time || "09:00"}</div>
                  <div className="text-gray-500">{selectedFlight?.arrival?.date || "2023-06-15"}</div>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div>{selectedFlight?.departure?.city || "Kathmandu"}</div>
                <div>{selectedFlight?.arrival?.city || "Delhi"}</div>
              </div>
            </div>

            {/* Passenger & Seat Details */}
            <div className="mb-6 pb-6 border-b">
              <h3 className="font-medium mb-3">Passenger & Seat Details</h3>
              <div className="space-y-2">
                {selectedSeats?.map((seat, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>{seat.passenger}</div>
                    <div className="font-medium">Seat {seat.seat}</div>
                  </div>
                )) || <div className="text-sm text-gray-500">No seat information available</div>}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Price Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <div>Base Fare ({selectedFlight?.passengers?.adults || 1} passenger)</div>
                  <div>NPR {basePrice.toLocaleString()}</div>
                </div>
                <div className="flex justify-between">
                  <div>Seat Selection</div>
                  <div>NPR {seatPrice.toLocaleString()}</div>
                </div>
                <div className="flex justify-between">
                  <div>Taxes & Fees</div>
                  <div>NPR {taxes.toLocaleString()}</div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between font-bold text-lg pt-4 border-t">
              <span>Total Amount</span>
              <span>NPR {totalPrice.toLocaleString()}</span>
            </div>

            {/* Cancellation Policy */}
            <div className="mt-6 text-xs text-gray-500">
              <p className="font-medium mb-1">Cancellation Policy:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Free cancellation within 24 hours of booking</li>
                <li>25% fee if cancelled 7+ days before departure</li>
                <li>50% fee if cancelled 3-7 days before departure</li>
                <li>Non-refundable if cancelled within 72 hours of departure</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment

