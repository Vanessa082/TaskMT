import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_BASE_URL } from "../../../constants/constants";

export default function Calendar() {
  const handleViewCalendar = async () => {
    try {
      await fetch(`${API_BASE_URL}/calendar`), {
        method: 'GET',
        mode: "no-cors",
        headers: {
          'Content-Type': 'appplication/json',
        }
      }
    } catch (error) {
      console.error('Failed to connect with google', error)
    }
  }

  return (
    <form action="http://localhost:3000/calendar" method="get">
      <input type="submit" value="Press to log in" />
    </form>
  )
}