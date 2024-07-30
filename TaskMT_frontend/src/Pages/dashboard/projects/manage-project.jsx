import { useEffect, useState } from "react";
import { useGetRequest } from "../../../providers/hooks/use-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import SixDotEllipsis from "../../../assets/custom-icons/six-dot-elipsis";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const { data, error, loading } = useGetRequest("/projects");

  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-between gap-8 font-sans px-10">
     <h2 className="text-2xl">Project Overview</h2>
      {projects.map((project) => (
        <div key={project.id} className="text-xl flex items-center bg-text-color-1 py-4  pl-2 border border-black/15 mb-5 rounded-lg transition-all duration-300 shadow-[2px_2px_3px_rgba(0,0,0,0.4)]  w-[40%] gap-60">
          
          <h2 className="flex justify-between items-start gap-6"> <SixDotEllipsis /> {project.name}</h2>

        <div className="flex justify-between items-center gap-20">

        <FontAwesomeIcon icon={faPen} className="text-primary-color"/>
            {/* Edit project */}
        

          
            <FontAwesomeIcon icon={faEye} />
            {/* View project */}

          
            <FontAwesomeIcon icon={faTrash} className="text-red-500"/>
            {/* Delete project */}
        </div>
          
        </div>
      ))}
    </div>
  );
}
