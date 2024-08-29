import React from 'react';

const FeaturesItems = [
  {
    img: "/landing/task-management.png", // Add image paths here
    title: "Task Management",
    paragraph: "Organize and prioritize your tasks with ease."
  },
  {
    img: "/landing/time-tracking.png", // Add image paths here
    title: "Time Tracking",
    paragraph: "Keep track of time spent on each project."
  },
  {
    img: "/landing/resource-management.png", // Add image paths here
    title: "Resource Management",
    paragraph: "Efficiently allocate resources to tasks."
  }
];

export default function Features() {
  return (
    <section className='w-full bg-secondary-color flex flex-col sm:flex-row justify-around items-center px-4 py-4 sm:py-12'>
      {FeaturesItems.map(({ img, title, paragraph }) => (
        <div key={title} className="flex flex-col items-center justify-center gap-4 max-w-[250px] text-center">
          <img src={img} alt={title} width={100} height={100} />

          <h2 className="font-semibold text-[1.2rem]">{title}</h2>
          <p className="text-gray-500">{paragraph}</p>
        </div>
      ))}
    </section>
  );
}
