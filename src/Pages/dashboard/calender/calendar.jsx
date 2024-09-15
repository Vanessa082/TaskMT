import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_BASE_URL } from "../../../constants/constants";

export default function Calendar() {
  return (
    <form action={`${API_BASE_URL}/calendar`} method="get">
      <button 
        type="submit" 
        className="bg-primary-color text-white font-bold py-2 px-4 rounded flex items-center space-x-2"
      >
        <FontAwesomeIcon icon={faCalendar} />
        <span>View Calendar</span>
      </button>
    </form>
  );
}
