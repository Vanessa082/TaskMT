import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo.svg";

const NavItems = [
	{
		text: "Home",
		href: "#",
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
		text: "Contact",
		href: "#",
	},
	{
		text: "Testimonial",
		href: "#",
	},
]


export default function Navbar() {
	return (
		<>
			<nav className="flex items-center justify-between text-text-color-1">
				<img src={logo} alt="TaskMT logo" />
				<div>
					<ul className="flex">
						{
							NavItems.map(({ text, href }) => (
								<li
									key={text}
									className=""
								>
									<a
										href={href}
										className=""
									>
										{text}
									</a>
								</li>
							))
						}

						<div className="user-action-icon">
							<FontAwesomeIcon icon={faUserCircle} size="3x" />
							<span>Login or Register</span>
						</div>
					</ul>
				</div>
			</nav>
		</>
	)
}