import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/app-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function AppLoader() {
  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center">
      <div className="w-fit h-fit flex items-center justify-center flex-nowrap gap-2 text-primary-color">
        <span className="font-semibold">Loading</span>

        <FontAwesomeIcon icon={faSpinner} spin />
      </div>
    </div>
  );
};

const DashboardGaurd = ({ children }) => {
  const { currentUser, currentUserLoading } = useAppContext();
  const navigate = useNavigate();

  if (currentUserLoading) return (
    <AppLoader />
  );

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export { DashboardGaurd };
