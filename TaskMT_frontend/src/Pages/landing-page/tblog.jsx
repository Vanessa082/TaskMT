export default function Tblog() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 lg:py-16 lg:px-12 bg-white shadow-lg rounded-lg text-center max-w-4xl mx-auto">
      {/* Text Content */}
      <div className="w-full flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-primary-color">
          Getting Started with Super TaskMT
        </h2>
        <p className="text-md text-gray-500">Published: 2024</p>
        <p className="text-lg text-text-color-2 leading-relaxed">
          TaskMT aims to develop an understandable and user-friendly tool that
          enables users to effectively organize their tasks, manage projects,
          and meet deadlines. While the app won't magically solve all your
          productivity, time management, and procrastination issues, the
          combination of planning and execution can significantly boost your
          productivity and help you stay on track.
        </p>
        <button className="bg-primary-color text-white px-8 py-3 rounded-lg hover:bg-secondary-color transition-all duration-300 mx-auto">
          Read More
        </button>
      </div>
    </div>
  );
}
