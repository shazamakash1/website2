import React, { useState, useEffect, useRef } from "react";
import { Menu, X, LogIn } from "lucide-react";

const Header = ({ page, navigateTo, changePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navLinks = ["Home", "Gallery", "Notices", "Contact"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const NavLink = ({ name }) => (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        navigateTo(name.toLowerCase());
        setIsMenuOpen(false);
      }}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group ${
        page === name.toLowerCase()
          ? "text-amber-500"
          : "text-slate-300 hover:text-white"
      }`}
    >
      {name}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
          page === name.toLowerCase() ? "scale-x-100" : ""
        }`}
      ></span>
    </a>
  );

  const handleDropdownLinkClick = (pageName) => {
    changePage(pageName);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold tracking-wider text-white">
              <span className="text-amber-500">S</span>PRINGDALE
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink key={link} name={link} />
            ))}
            <div className="relative" ref={dropdownRef}>
              {/* <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 rounded-md text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center transition-colors duration-300"
              >
                <LogIn className="mr-2 h-4 w-4" /> Login
              </button> */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg py-1 z-20 transition-all duration-300 transform-gpu animate-fade-in">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDropdownLinkClick("login_student");
                    }}
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-amber-500/20 hover:text-amber-400"
                  >
                    Student
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDropdownLinkClick("login_teacher");
                    }}
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-amber-500/20 hover:text-amber-400"
                  >
                    Teacher
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDropdownLinkClick("login_admin");
                    }}
                    className="block px-4 py-2 text-sm text-slate-300 hover:bg-amber-500/20 hover:text-amber-400"
                  >
                    Admin
                  </a>
                </div>
              )}
            </div>
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 animate-fade-in">
          <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavLink key={link} name={link} />
            ))}
            <div className="border-t border-slate-700 pt-4 mt-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownLinkClick("login_student");
                  setIsMenuOpen(false);
                }}
                className="block text-slate-300 hover:text-amber-500 px-3 py-2"
              >
                Student Login
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownLinkClick("login_teacher");
                  setIsMenuOpen(false);
                }}
                className="block text-slate-300 hover:text-amber-500 px-3 py-2"
              >
                Teacher Login
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleDropdownLinkClick("login_admin");
                  setIsMenuOpen(false);
                }}
                className="block text-slate-300 hover:text-amber-500 px-3 py-2"
              >
                Admin Login
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header; // This would be uncommented in your local file
