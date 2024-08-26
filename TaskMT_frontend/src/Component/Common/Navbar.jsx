import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../providers/context/app-context";
import { useState } from "react";

const NavItems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Tblog",
    href: "/blog",
  },
  {
    text: "About",
    href: "/about",
  },
  {
    text: "Subscribe",
    href: "/subscribe",
  },
  {
    text: "Testimonial",
    href: "/testimonials",
  },
];

export default function Navbar() {
  const { currentUser } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-4 py-4 flex items-center justify-between bg-white text-primary-color shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="TaskMT logo" className="h-12 w-20" />
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div
        className="md:hidden text-primary-color z-20"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} size="2x" />
      </div>

      {/* Overlay for Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } md:hidden`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Nav Items */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-10 md:static md:w-auto md:bg-transparent md:shadow-none md:flex items-center gap-4 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0`}
      >
        <ul className="flex flex-col md:flex-row gap-6 p-6 md:p-0">
          {NavItems.map(({ text, href }) => (
            <li key={text}>
              <a href={href} className="hover:text-secondary-color transition-colors duration-200">
                {text}
              </a>
            </li>
          ))}
        </ul>

        {/* User Action */}
        {currentUser ? (
          <Link to="/dashboard" className="mt-4 md:mt-0">
            <button className="user-action-icon flex flex-col items-center bg-primary-color text-text-color-1 cursor-pointer">
              {/* <FontAwesomeIcon icon={faUserCircle} size="2x" /> */}
              <span>{currentUser.username}</span>
            </button>
          </Link>
        ) : (
          <Link to="/login" className="mt-4 md:mt-0">
            <div className="user-action-icon flex flex-col items-center text-primary-color cursor-pointer">
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
              <span>Login</span>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}
