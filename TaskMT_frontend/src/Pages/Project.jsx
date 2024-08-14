import React, { useState, useEffect } from 'react';  
import Task from './Task/Task';
import { FaTrash, FaEdit } from 'react-icons/fa';  


const ProjectForm = () => {  
  const [projects, setProjects] = useState([]);  
  const [projectName, setProjectName] = useState('');  
  
  const handleAddProject = async (e) => {  
    e.preventDefault();  
    if (projectName) {  
      const newProject = {  
        id: Date.now(), 
        name: projectName,  
        tasks: []        
      };  
      const updatedProjects = [...projects, newProject];  
      setProjects(updatedProjects);  
      localStorage.setItem('projects', JSON.stringify(updatedProjects));  
      setProjectName('');  
    } else {  
      alert("Please enter a project name.");  
    }  
  };  

  const fetchProjects = async () => {  
    const localProjects = JSON.parse(localStorage.getItem('projects')) || [];  
    setProjects(localProjects);  
  };  

  const handleDeleteProjecct = async (id) => {  
    const updatedTasks = project.tasks.filter(task => task.id !== id);  
    const updatedProjects = projects.map(p => p.id === project.id ? { ...p, tasks: updatedTasks } : p);  
    
    const deleteResponse = await fetch(`YOUR_API_END_POINT/tasks/${id}`, {  
        method: 'DELETE',  
    });  
    
    if (deleteResponse.ok) {  
        setProjects(updatedProjects);  
        localStorage.setItem('projects', JSON.stringify(updatedProjects));  
        notify(`Task Deleted Successfully.`);  
    }  
};

  useEffect(() => {  
    fetchProjects();  
  }, []);  

  return (  
    <div>  
      <h2 className='text-2xl	'>Add a Project</h2>  
      <form onSubmit={handleAddProject} className='flex items-end	 w-full	justify-end	 gap-4	'>  
        <input   
          type="text"   
          placeholder="Project Name"   
          value={projectName}   
          onChange={(e) => setProjectName(e.target.value)}   
          required   
      className='h-8 w-5/12	border-slate-950	'  />  
        <button type="submit" className='flex align-center justif-center w-24	text-white h-9		text-base	'>Add</button>  
      </form>  

      <h2>Projects</h2>  
      <div className="flex items-center justify-center flex-wrap gap-4 ">
        
      {projects.map((project, index) => (  
          <div key={project.id} className='bg-white shadow-2xl rounded-md gap-4 flex items-center justify-center flex-col text-base scroll-auto	'>  
          <div className=" flex items-center justify-around gap-24 title">
          {project.name}
          <div className="btn">
          <button className='bg-transparent shadow-2xl border-4 border-black-200 border-t-black-300' onClick={() => handleEdit()}>
                                        <FaEdit />
                                    </button>
                                    <button className='bg-transparent shadow-2xl border-4 border-black-200 border-t-black-300' onClick={() => handleDelete()}>
                                        <FaTrash />
                                    </button>
                                    </div>
             
            </div>
            <div className="result">
            <Task project={project} setProjects={setProjects} projects={projects}/>  
            </div> 
            
          </div>  
          
        ))}  
        
      </div>  
    </div>  
  );  
};  

export default ProjectForm;