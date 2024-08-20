import {
  faAdd,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectList from "../../../Pages/dashboard/projects/project-list";
import { useModalContext } from "../../../providers/context/modal-context";

export default function ProjectNavComponents() {
  const [isProjectsvisible, setVisibleProjects] = useState(false);

  const {projectModalOpen, setProjectModalOpen } = useModalContext();

  const toggleProjects = () => {
    setVisibleProjects(!isProjectsvisible);
  };

  const handleOpenModal = () => {
    setProjectModalOpen(true);
  };

  return (
    <>
      <div className="cursor-pointer px-3 py-2 flex  text-lg text-gray-800 hover:bg-primary-color hover:text-text-color-1 rounded-full justify-between items-center gap-14 border-stone-900 font-bold">
        Projects
        <FontAwesomeIcon
          icon={isProjectsvisible ? faChevronUp : faChevronDown}
          onClick={toggleProjects}
        />
      </div>

      {isProjectsvisible && (
        <div className="mt-2 pl-4 space-y-2">
          <ProjectList />
          <Link to={"/dashboard/projects"}>
            <div className="">
              Manage Projects
            </div>
          </Link>
          <div onClick={handleOpenModal} className="cursor-pointer">
            <FontAwesomeIcon icon={faAdd} />
            Add Projects
          </div>
        </div>
      )}

    </>
  );
}
