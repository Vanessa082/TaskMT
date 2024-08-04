import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import TaskCreationModal from "./add-task-modal";

export default function AddTask () {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  return (
      <div>
        <FontAwesomeIcon icon={faPlus} onClick={openModal} className="cursor-pointer"/>

        {isModalOpen && <TaskCreationModal onClose={closeModal}/>}
      </div>
  )
}