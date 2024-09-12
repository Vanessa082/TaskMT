import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_BASE_URL } from "../../../constants/constants";

export default function Calendar() {
const handleViewCalendar = async () => {
  try {
    await fetch(`${API_BASE_URL}/calendar`), {
      method: 'GET',
      headers: {
        'Content-Type': 'appplication/json'
      },
      body: JSON.stringify()
    }
  } catch (error) {
    console.error('Failed to connect with google', error)
  }
}
  return (
    <button className='flex items-center p-2 gap-2 rounded-full  bg-[#f3f4f6] cursor-pointer'onClick={handleViewCalendar}>
      <FontAwesomeIcon icon={faCalendar} />
      Veiw Calendar
    </button>
  )
}