import {
  faBars,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProjectNavComponents() {
  const [isProjectsvisible, setVisibleProjects] = useState(true);
  const navigate = useNavigate

  const toggleProjects = () => {
    setVisibleProjects(!isProjectsvisible);
  };
  return (
    <>
      <div className="cursor-pointer">
        Projects
        <FontAwesomeIcon
          icon={isProjectsvisible ? faChevronUp : faChevronDown}
          onClick={toggleProjects}
        />
      </div>

      {isProjectsvisible && (
        <Link to={"/dashboard/projects"}>
          <div>
          <FontAwesomeIcon icon={faBars} size="3x" />
          Manage Projects
        </div>
        </Link>
      )}
    </>
  );
}
