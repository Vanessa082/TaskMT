import { useNavigate } from "react-router-dom";
import { useAppContext } from "./app-context";

const DashboardGaurd = ({ children }) => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return <>{children}</>;
};

export { DashboardGaurd };
