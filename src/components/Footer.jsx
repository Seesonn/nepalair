import { Link } from "react-router-dom"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-[#003580] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <FaPlane className="text-2xl mr-2" />
              <h2 className="text-xl font-bold">Nepal Airlines</h2>
            </div>
            <p className="mb-4 text-white/80">
              The flag carrier airline of Nepal, connecting the Himalayas to the world since 1958.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-white hover:text-[#FFD700] transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-[#FFD700] transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-[#FFD700] transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" className="text-white hover:text-[#FFD700] transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-white/80 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="text-white/80 hover:text-white transition-colors">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/80 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-white/80 hover:text-white transition-colors">
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Travel Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Travel Information</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/baggage" className="text-white/80 hover:text-white transition-colors">
                  Baggage Information
                </Link>
              </li>
              <li>
                <Link to="/special-assistance" className="text-white/80 hover:text-white transition-colors">
                  Special Assistance
                </Link>
              </li>
              <li>
                <Link to="/travel-insurance" className="text-white/80 hover:text-white transition-colors">
                  Travel Insurance
                </Link>
              </li>
              <li>
                <Link to="/visa-passport" className="text-white/80 hover:text-white transition-colors">
                  Visa & Passport
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-white/80 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-white/20 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-[#FFD700]" />
                <span>New Road, Kathmandu 44600, Nepal</span>
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-[#FFD700]" />
                <span>+977 9884220757</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-3 text-[#FFD700]" />
                <span>nepalairlines@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-center text-white/70">
          <p>&copy; {new Date().getFullYear()} Nepal Airlines Corporation. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

