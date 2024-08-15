import {
  faAdd,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import ProjectDetailsModal from "../../../Pages/dashboard/projects/project-details-modal";
import ProjectList from "../../../Pages/dashboard/projects/project-list";
import { useModalContext } from "../../../providers/context/modal-context";

export default function ProjectNavComponents() {
  const [isProjectsvisible, setVisibleProjects] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setProjectModalOpen } = useModalContext();

  const toggleProjects = () => {
    setVisibleProjects(!isProjectsvisible);
  };

  const handleOpenModal = () => {
    setProjectModalOpen(true);
  };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  return (
    <>
      <div className="cursor-pointer px-3 py-2 flex  text-lg text-gray-800 hover:bg-blue-100 rounded-full justify-between items-center gap-14 border-stone-900 font-bold">
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
            <div>Manage Projects</div>
          </Link>
          <div onClick={handleOpenModal} className="cursor-pointer">
            <FontAwesomeIcon icon={faAdd} />
            Add Projects
          </div>
        </>
      )}

      {/* {isModalOpen && <ProjectDetailsModal onClose={closeModal} />} */}
    </>
  );
}
