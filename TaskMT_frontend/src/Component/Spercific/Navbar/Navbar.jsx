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
			<nav
				className="w-full px-6 py-5  gap-8 flex items-center justify-between text-text-color-1 bg-secondary-color"
			>
				<img src={logo} alt="TaskMT logo" className="bg-color w-80 h-80"/>
				<div>
					<ul className="flex justify-between items-center gap-4">
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

						<div className="user-action-icon flex flex-col">
							<FontAwesomeIcon icon={faUserCircle} size="3x" />
							<span>Register</span>
						</div>
					</ul>
				</div>
			</nav>
		</>
	)
}