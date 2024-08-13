export default function Tblog() {
  return (
    <div className="flex items-center justify-between">
      <div className="w-30 flex flex-col">
        <h2 className="text-lg font-bold text-secondary-color">
          Getting started with Super TaskMT
        </h2>
        <p className="text-sm text-gray-500">2024</p>
        <p className="text-base mt-4">
          TaskMT has as its purpose to develop an understandable and
          user-friendly tool that enables users to effectively organize their
          tasks, manage their projects, and meet deadlines. While the app won't
          magically solve all your productivity, time management, and
          procrastination issues, the combination of planning…
        </p>
        <button className="bg-primary-color text-text-color-1 px-8 py-2 mt-4 rounded-md">
          Read More
        </button>
      </div>

      <img src="/assets/blog.gif" alt="blog post icon" className="w-70" />
    </div>
  );
}
