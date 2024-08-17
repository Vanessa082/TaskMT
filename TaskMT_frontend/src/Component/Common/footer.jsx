import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <footer className="w-full px-6 py-10 bg-custom-gradient text-text-color-1">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        {/* Web App Button */}
        <button className="flex items-center gap-3 px-6 py-3 bg-primary-color text-text-color-1 rounded-md hover:bg-secondary-color transition-colors duration-300">
          <FontAwesomeIcon icon={faGlobe} size="2x" />
          <span className="text-lg font-semibold">Web App</span>
        </button>

        {/* Footer Content */}
        <div className="w-full flex flex-col md:flex-row justify-between gap-8 text-center md:text-left">
          {/* Explore TaskMT Section */}
          <div className="flex-1">
            <h4 className="text-lg font-bold mb-4">Explore TaskMT</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-secondary-color transition-colors duration-200">Universal Access</a></li>
              <li><a href="#" className="hover:text-secondary-color transition-colors duration-200">Streamlined Task Organization</a></li>
              <li><a href="#" className="hover:text-secondary-color transition-colors duration-200">Effortless Time Tracking</a></li>
            </ul>
          </div>
          {/* Copyright Section */}
          <div className="flex-1">
            <p className="text-sm text-gray-300">© 2024 Task Management System, Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
