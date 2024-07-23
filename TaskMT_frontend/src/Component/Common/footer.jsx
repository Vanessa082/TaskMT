import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGlobe } from "@fortawesome/free-solid-svg-icons"

export default function Footer() {
    return (
        <footer className="w-full  px-6 py-5 gap-8 flex flex-col items-center  text-text-color-1 bg-custom-gradient transition-all duration-300 ease-custom-cubic">

            <button className="px-6 py-5 gap-8 flex items-center  text-text-color-1 bg-custom-gradient transition-all duration-300 ease-custom-cubic">
            <FontAwesomeIcon icon={faGlobe} size="3x" />
                Web App
            </button>
            <div className="flex justify-between gap-6">
            <div>
                <h4>Explore TaskMT</h4>
                <ul>
                    <li><a href="#">Universal Access</a></li>
                    <li><a href="#">Streamlined Task Organization</a></li>
                    <li><a href="#">Effortless Time Tracking</a></li>
                </ul>
            </div>
            <p>© 2024 Task Management System, Inc. All rights reserved.</p>
            </div>
        </footer>
    )
}