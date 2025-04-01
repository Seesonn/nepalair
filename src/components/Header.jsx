

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaPlane, FaUser, FaBars, FaTimes } from "react-icons/fa"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white text-[#003580] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo with image */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <img 
                src="https://imgs.search.brave.com/nWidVN0I_L8ANzjw2Y52fAxQXbgByALj_HMlaJLuly8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/ZGl4LmNvbS9pbWcv/ai5wbmc" 
                alt="Nepal Airlines Logo" 
                className="h-12 mr-3"
              />
              <h1 className="text-xl font-bold">Nepal Airlines</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-medium hover:text-[#FFD700] transition-colors">
              Home
            </Link>
            <Link to="/flight-status" className="font-medium hover:text-[#FFD700] transition-colors">
              Flight Status
            </Link>
            <Link to="/my-bookings" className="font-medium hover:text-[#FFD700] transition-colors">
              My Bookings
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-[#003580] text-white px-4 py-2 rounded-md font-medium hover:bg-[#FFD700] hover:text-[#003580] transition-colors"
            >
              <FaUser />
              <span>Login</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#003580] text-2xl focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#003580]/20">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="font-medium hover:text-[#FFD700] transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link
                to="/flight-status"
                className="font-medium hover:text-[#FFD700] transition-colors"
                onClick={toggleMenu}
              >
                Flight Status
              </Link>
              <Link
                to="/my-bookings"
                className="font-medium hover:text-[#FFD700] transition-colors"
                onClick={toggleMenu}
              >
                My Bookings
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 bg-[#003580] text-white px-4 py-2 rounded-md font-medium hover:bg-[#FFD700] hover:text-[#003580] transition-colors mt-4"
                onClick={toggleMenu}
              >
                <FaUser />
                <span>Login</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header