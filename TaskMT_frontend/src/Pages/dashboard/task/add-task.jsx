import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModalContext } from "../../../providers/context/modal-context";

export default function AddTask() {
  const { setTaskModalOpen } = useModalContext();

  const handleOpenModal = () => {
    setTaskModalOpen(true);
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={faPlus}
        onClick={handleOpenModal}
        className="text-accent-color cursor-pointer"
      />
    </div>
  );
}
