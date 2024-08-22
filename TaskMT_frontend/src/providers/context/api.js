import { API_BASE_URL } from "../../constants/constants";

const fetchCurrentUser = async () => {
  const token = localStorage.getItem('token');

  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.error(error);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    return null;
  }
};

const fetchProjects = async () => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "GET",
    headers: {
      "Content-Type": "Application/json",
      "Authorisation": `Bearer ${localStorage.getItem("token")}`
    },
  });

  if (!response.ok) {
    console.error('Response Was not ok', error);
  };

  return response.json();
}

export {
  fetchCurrentUser,
  fetchProjects
}
