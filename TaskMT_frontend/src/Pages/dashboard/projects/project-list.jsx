// import { useEffect, useState } from "react";
// import { useGetRequest } from "../../../providers/hooks/use-fetch";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function ProjectList() {
  // const [projects, setProjects] = useState([]);
  // const { data, error, loading } = useGetRequest("/projects");
  const navigate = useNavigate(); // Initialize useNavigate

  // useEffect(() => {
  //   if (data) setProjects(data);
  // }, [data]);

  const handleProjectClick = (projectId) => {
    // navigate(`/projects/${projectId}`); // Navigate to project details page
  };

  return (
    <ul>
      {/* {projects.map((project) => (
        <li key={project.project_id} onClick={() => handleProjectClick(project.project_id)}>
          {project.name} <FontAwesomeIcon icon={faEllipsisVertical} />
        </li>
      ))} */}
    </ul>
  );
}
