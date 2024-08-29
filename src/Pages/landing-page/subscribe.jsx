export default function Subscribe() {
  return (
    <div className="flex flex-col items-center text-center gap-6 text-text-color-1 bg-custom-gradient py-10 px-4 sm:px-10">
      <h2 className="font-sans text-4xl font-bold text-white">
        Just let go of your thoughts.
      </h2>
      <p className="text-lg text-white">
        To keep your mind clear, add a task to your project for today or
        schedule it for a later time.
      </p>
      <form
        action=""
        className="flex flex-col sm:flex-row gap-0 w-full max-w-md rounded-md overflow-hidden border-none"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-color border-none"
        />
        <button
          type="submit"
          className="bg-primary-color text-text-color-1 px-6 py-2 border-none cursor-pointer hover:bg-secondary-color transition-colors duration-200"
        >
          Subscribe to Tblog
        </button>
      </form>
    </div>
  );
}
