import { FaMapMarkerAlt } from "react-icons/fa"

const DestinationCard = ({ destination }) => {
  return (
    <div className="card overflow-hidden group cursor-pointer">
      <div className="relative h-48 overflow-hidden">
        <img
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold">{destination.name}</h3>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1 text-[#FFD700]" />
            <span>{destination.country}</span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-gray-500">Starting from</span>
            <div className="font-bold text-[#D21034]">{destination.price}</div>
          </div>
          <button className="bg-[#003580] text-white px-4 py-2 rounded-md hover:bg-[#002a66] transition-colors">
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}

export default DestinationCard

