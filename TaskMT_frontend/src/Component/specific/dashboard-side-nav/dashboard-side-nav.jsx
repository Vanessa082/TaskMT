// import { Link } from "react-router-dom";
// import { useAppContext } from "../../../providers/context/app-context";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
// import ProjectNavComponents from "./project_nav-components";

// const NavContent = [
//   {
//     text: "Home",
//     to: "/",
//   },

//   {
//     text: "Calendar",
//     to: "/dashboard/calendar",
//   },
// ];

// export default function DashboardSideNav() {
//   const { currentUser } = useAppContext();

//   return (
//     <nav className="w-full max-w-[300px] min-h-full border flex flex-col items-start justify-start gap-4 [&_a]:cursor-pointer bg-sidebar-color text-text-color-3 font-sans pl-6 text-xl">
//       <Link to="/dashboard">
//         <div className="user-action-icon flex flex-col text-text-color-4 pt-3 cursor-pointer">
//           <FontAwesomeIcon icon={faUserCircle} size="2x" />
//           <span>{currentUser.username}</span>
//         </div>
      
//       </Link>
//       {NavContent.map(({ text, to }) => (
//         <Link key={text} to={to}>
//           {text}
//         </Link>
//       ))}

//       <ProjectNavComponents />
//     </nav>
//   );
// }
