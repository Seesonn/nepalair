import { FaTag, FaArrowRight } from "react-icons/fa"

const PromotionCard = ({ promotion }) => {
  return (
    <div className="card group hover:scale-[1.02]">
      <div className="relative">
        <img src={promotion.image || "/placeholder.svg"} alt={promotion.title} className="w-full h-48 object-cover" />
        {promotion.discount && (
          <div className="absolute top-4 right-4 bg-[#D21034] text-white px-3 py-1 rounded-full flex items-center">
            <FaTag className="mr-1" />
            <span>{promotion.discount} OFF</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-[#003580]">{promotion.title}</h3>
        <p className="text-gray-600 mb-4">{promotion.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-[#D21034] font-bold">{promotion.price}</div>
          <button className="flex items-center text-[#003580] font-medium group-hover:text-[#6d0ff2] transition-colors">
            Book Now <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromotionCard

