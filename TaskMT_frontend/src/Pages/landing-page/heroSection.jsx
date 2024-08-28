import { Link } from "react-router-dom";

export default function Herosection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-4 px-6 py-12 lg:py-20 bg-hero-banner bg-center bg-cover">
      {/* Text Content */}
      {/* < className="text-center lg:text-left lg:w-1/2 max-w-md lg:max-w-lg font-sans font-extrabold"> */}
        <h1 className="text-6xl font-extrabold text-background-color">
          Welcome to TaskMT
        </h1>
        <p className="text-background-color text-xl font-semibold max-w-[400px]">
          Unlock Your Full Potential, Create, track, and manage your daily tasks effortlessly.
        </p>

        <Link to="/login">
          <button className="bg-primary-color text-white px-8 py-3 rounded-lg hover:bg-secondary-color">
            Get Started
          </button>
        </Link>
    </section>
  );
}
