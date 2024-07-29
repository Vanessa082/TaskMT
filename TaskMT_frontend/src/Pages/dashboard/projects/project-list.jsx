import { useEffect, useState } from "react";
import { useGetRequest } from "../../../providers/hooks/use-fetch";

export default function ProjectList() {
  const [project, setProjects] = useState([]);
  const { data, error, loading } = useGetRequest("/projects");

  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  return (
    <ul>
      {project.map(() => {
        <li key={project.id}>{project.name}</li>;
      })}
    </ul>
  );
}
