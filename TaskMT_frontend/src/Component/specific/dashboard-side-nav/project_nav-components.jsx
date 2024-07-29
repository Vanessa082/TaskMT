import {
  faAdd,
  faBars,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectDetailsModal from "../../../Pages/dashboard/projects/project-details-modal";
import ProjectList from "../../../Pages/dashboard/projects/project-list";

export default function ProjectNavComponents() {
  const [isProjectsvisible, setVisibleProjects] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleProjects = () => {
    setVisibleProjects(!isProjectsvisible);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
        <>
        <ProjectList />
          <Link to={"/dashboard/projects"}>
            <div>
              <FontAwesomeIcon icon={faBars} size="1x" />
              Manage Projects
            </div>
          </Link>

          <div onClick={openModal} className="cursor-pointer">
            <FontAwesomeIcon icon={faAdd} />
            Add Projects
          </div>
        </>
      )}

      {isModalOpen && <ProjectDetailsModal onClose={closeModal} />}
    </>
  );
}
