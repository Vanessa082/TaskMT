import { useEffect, useState } from "react";
import { useGetRequest } from "../../../providers/hooks/use-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ManageProjects() {
  const [project, setProject] = useState([]);
  const { data, error, loading } = useGetRequest("/projects");

  useEffect(() => {
    if (data) {
      setProject(data);
    }
  }, [data]);
  return (
    <div className="">
      Project Overview
      {project.map(() => {
        <div key={project.id}>{project.name}

      <button>
        <FontAwesomeIcon icon={faPen} />
        {/* Edit project */}
      </button>

      <button>
        <FontAwesomeIcon icon={faEye} />
        {/* view project  */}
      </button>

      <button>
        <FontAwesomeIcon icon={faTrash} />
      </button>
        </div>;
      })}
    </div>
  );
}
