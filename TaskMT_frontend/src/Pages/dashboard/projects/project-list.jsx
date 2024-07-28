import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../../constants/constants";
import { Link } from "react-router-dom";

export default function ProjectList() {
  const [project, setProjects] = useState("");

  useEffect(() => {
    const fetchProjects = async() => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`, {
          method : "GET",
          header : {
            "Content-Type" : "Application/json",
            "Authorization" : `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if(!response.ok) {
          throw new Error("Network Response was not ok");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("error fecthing projects", error);
      }
    };
  }, []);
  return (
    <ul>
      {projects.map(() => {
        <Link>
        <li>{project.name}</li>
        </Link>
      })}
    </ul>
  )
}
