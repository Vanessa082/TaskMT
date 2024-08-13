import { Link } from "react-router-dom";

export default function Herosection() {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col text-center gap-4 ">
        <p className="text-secondary-color font-bold text-lg pt-4">
          Welcome to TaskMT
        </p>
        <p className="text-primary-color font-bold text-lg">
          Unlock Your Full Portential
        </p>
      </div>

      <img src="/assets/landing.svg" alt="landing_icon" />

      <div className="flex flex-col w-80 items-center">
        <p className="text-secondary-color font-bold text-lg text-nowrap pb-8">
          Create track, and manage your daily tasks
        </p>
        <Link to="registration">
          <button className="bg-primary-color text-text-color-1 px-16 py-2 rounded-md hover:animate-bounce">
            Get Started
          </button>
        </Link>
      </div>

      <hr className="bg-black w-[90%]" />
    </div>
  );
}
