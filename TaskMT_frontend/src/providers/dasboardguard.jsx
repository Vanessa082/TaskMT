import { useNavigate } from "react-router-dom";
import { useAppContext } from "./app-context";

const DashboardGourd = ({ children }) => {
  const { currentUser } = useAppContext();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
  }

  return <>{children}</>;
};

export {
  DashboardGourd
}