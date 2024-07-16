import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUserCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/logo.svg";

export default function Navbar () {
    return(
        <>
        <nav>
            <img src={logo} alt="TaskMT logo" />
            <div>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="">Tblog</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Contact</a></li>
                    <li><a href="">Testimonial</a></li>
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