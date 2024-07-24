import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { useAppContext } from "../../providers/app-context";

const NavItems = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Tblog",
    href: "#",
  },
  {
    text: "About",
    href: "#",
  },
  {
    text: "Subscribe",
    href: "#",
  },
  {
    text: "Testimonial",
    href: "#",
  },
];

export default function Navbar() {
  const { currentUser } = useAppContext();

  return (
    <nav className="w-full px-10 py-8 gap-8 flex items-center justify-between text-text-color-1 bg-custom-gradient transition-all duration-300 ease-custom-cubic ">
      <Link to="/">
        <img src={logo} alt="TaskMT logo" className="bg-color" />
      </Link>
      <div>
        <ul className="flex justify-between items-center gap-4">
          {NavItems.map(({ text, href }) => (
            <li key={text} className="">
              <a href={href} className="">
                {text}
              </a>
            </li>
          ))}

          {currentUser ? (
            <Link to="/dashboard">
              <div className="user-action-icon flex flex-col text-text-color-1 cursor-pointer">
                <FontAwesomeIcon icon={faUserCircle} size="3x" />
                <span>{currentUser.username}</span>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <div className="user-action-icon flex flex-col text-text-color-1 cursor-pointer">
                <FontAwesomeIcon icon={faUserCircle} size="3x" />
                <span>Login</span>
              </div>
            </Link>
          )}
        </ul>
      </div>
    </nav>
  );
}
