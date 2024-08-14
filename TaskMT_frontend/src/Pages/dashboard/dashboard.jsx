// import React, { useState } from 'react';  
// import './dashboard.css';  
// import Task from '../Task/Task.jsx';  
// import Date from '../Date.jsx';  
// import Project from '../Project.jsx';  

// function Dashboard() {  
//   const [selectedMenuItem, setSelectedMenuItem] = useState('tasks');  

//   const handleMenuClick = (item) => {  
//       setSelectedMenuItem(item);  
//   };  

//   return (  
//     <div className="flex items-center justify-center  min-h-screen h-96 scroll-auto">  
//       <div className="bg-white h-5/6 gap-8 flex items-center justify-center flex-col menubar">  
      
//         <h3>Dashboard</h3>  
//         <div className="bg-black w-3/5 h-1/4 user"></div>  

//         <nav className="flex flex-col items-center justify-center menu-bar">  
//           <ul className="flex flex-col items-center justify-center gap-8 space-x-4">  
//             <li   
//               onClick={() => handleMenuClick('tasks')}   
//               className={selectedMenuItem === 'tasks' ? 'active' : 'bg-black w-32 bg-sky-50 w-32 shadow-2xl text-blue-600 flex rounded-md justify-center items-center'}  
//             >  
//               Tasks  
//             </li>  
//             <li   
//               onClick={() => handleMenuClick('project')}   
//               className={selectedMenuItem === 'project' ? 'active' : 'bg-black w-32 bg-sky-50 w-32 shadow-2xl text-blue-600 flex rounded-md justify-center items-center'}  
//             >  
//               Project  
//             </li>  
//           </ul>  
//         </nav>  
//       </div>  

//       <div className="bg-zinc-50 h-5/6 mainboard flex items-center flex-col justify-center scroll-auto	">  
//         <Date />  
//         <div className="bg-white flex items-left h-screen taskbtn">  
//           {selectedMenuItem === 'tasks' && <Task />}  
//           {selectedMenuItem === 'project' && <Project />}  
//         </div>  
//       </div>  
//     </div>  
//   );  
// }  

// export default Dashboard;