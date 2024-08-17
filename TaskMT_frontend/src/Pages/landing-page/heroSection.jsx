import { Link } from "react-router-dom";

export default function Herosection() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 py-12 lg:py-20 bg-gray-100">
      {/* Text Content */}
      <div className="text-center lg:text-left lg:w-1/2 max-w-md lg:max-w-lg">
        <h1 className="text-4xl font-extrabold text-primary-color">
          Welcome to TaskMT
        </h1>
        <p className="mt-4 text-secondary-color text-lg font-semibold">
          Unlock Your Full Potential
        </p>
        <p className="mt-2 text-gray-600 text-base">
          Create, track, and manage your daily tasks effortlessly.
        </p>
        <Link to="/login">
          <button className="mt-6 bg-primary-color text-white px-8 py-3 rounded-lg hover:bg-secondary-color transition-all duration-300">
            Get Started
          </button>
        </Link>
      </div>

      {/* Image */}
      <div className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
        <img src="/assets/landing.svg" alt="landing_icon" className="w-full max-w-sm lg:max-w-md" />
      </div>
    </div>
  );
}
