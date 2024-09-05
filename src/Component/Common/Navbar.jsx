import { Link } from "react-router-dom";
import { useAppContext } from "../../providers/context/app-context";
import { useState } from "react";
import { TextLogo } from "../ui/text-logo";
import { MdClose, MdMenu } from "react-icons/md";

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
    <header className="w-full px-4 py-4 flex items-center  justify-between bg-accent-color shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/">
        <TextLogo />
      </Link>

      <nav className="font-sans font-bold flex items-center justify-between text-background-color ">

        {/* Hamburger Icon for Mobile */}
        <div
      className="md:hidden text-primary-color z-20"
      onClick={() => setMenuOpen(!menuOpen)}
      aria-label="Toggle menu"
    >
      {menuOpen ? <MdClose size={32} /> : <MdMenu size={32} />} {/* Using react-icons */}
    </div>

        {/* Overlay for Mobile Menu */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            } md:hidden`}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        ></div>

        {/* Nav Items */}
        <div
          className={`fixed top-0 right-0 w-2/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-10 md:static md:w-auto md:bg-transparent md:shadow-none md:flex items-center gap-4 ${menuOpen ? "translate-x-0" : "translate-x-full"
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
        </div>
      </nav>

      {/* User Action */}
      {currentUser ? (
        <Link to="/dashboard">
          <button className="bg-primary-color px-5 py-2.5 font-sans font-bold rounded-md cursor-pointer text-base text-background-color">
            {currentUser.username}
          </button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="bg-primary-color px-5 py-2.5  rounded-md cursor-pointer font-bold font-sans text-background-color text-nowrap">Get Started</button>
        </Link>
      )}
    </header>
  );
}
