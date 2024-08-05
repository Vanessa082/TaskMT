import { createContext, useEffect, useState, useContext} from "react";
import { API_BASE_URL } from "../../constants/constants";

const GetProjectContext = createContext(null);

function GetProjectContextProvider  ({children}) {
  const [data, setData ] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async() => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects`,{
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
            "Authorisation": `Bearer ${localStorage.getItem("token")}`
          },
        });

        if (!response.ok) {
          throw new Error("Network Response was not ok");
        };

        const _data = await response.json();
        setData(_data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects();
  },[]);

  return(
    <GetProjectContext.Provider
    value={{
      data,setData,
      error,setError,
      loading,setLoading
    }}
    >

    </GetProjectContext.Provider>
  )
}

const useGetProjectContext = () => useContext(GetProjectContext);

export{ useGetProjectContext, GetProjectContextProvider};