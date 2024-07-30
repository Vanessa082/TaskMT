import { useEffect, useState } from "react";
import { useGetRequest } from "../../../providers/hooks/use-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const { data, error, loading } = useGetRequest("/projects");

  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  return (
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name} <FontAwesomeIcon icon={faEllipsisVertical} /></li>
        ))}
      </ul>
  );
}
