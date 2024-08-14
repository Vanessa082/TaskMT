import React, { useState, useEffect } from 'react';  
import { FaTrash, FaEdit } from 'react-icons/fa';  
import TaskNotification from '../Nofication/UseNotification';


const Task = ({ project = { tasks: [] }, setProjects, projects }) => {  
    const [isVisible, setIsVisible] = useState(false);  
    const [taskTitle, setTaskTitle] = useState('');  
    const [taskDescription, setTaskDescription] = useState('');  
    const [editingTaskId, setEditingTaskId] = useState(null);  
    const [taskTime, setTaskTime] = useState('');  
    const [taskDeadline, setTaskDeadline] = useState('');  
    

    const handleClose = () => {  
        setIsVisible(false);  
        setTaskTitle('');  
        setTaskDescription('');  
        setTaskDeadline('');  
        setTaskTime('');  
        setEditingTaskId(null);  
    };  

    const handleAddTask = async () => {  
        if (taskTitle && taskDescription && taskDeadline && taskTime) {  
            const newTask = {  
                id: Date.now(),  
                title: taskTitle,  
                description: taskDescription,  
                deadline: taskDeadline,  
                time: parseFloat(taskTime),  
                completed: false,  
            };  

            

            const updatedTasks = [...project.tasks, newTask];  
            const updatedProjects = projects.map(p => p.id === project.id ? { ...p, tasks: updatedTasks } : p);  
            setProjects(updatedProjects);  
            localStorage.setItem('projects', JSON.stringify(updatedProjects));  
            notify(`New Task Added: ${newTask.title}. Due by ${newTask.deadline} at ${newTask.time} hours.`);  
            handleClose();  
        } else {  
            alert("Please fill in all fields.");  
        }  
    };  

    const handleEdit = (id) => {  
        const taskToEdit = project.tasks.find(task => task.id === id);  
        if (taskToEdit) {  
            setTaskTitle(taskToEdit.title);  
            setTaskDescription(taskToEdit.description);  
            setTaskTime(taskToEdit.time);   
            setTaskDeadline(taskToEdit.deadline);  
            setEditingTaskId(id);  
            setIsVisible(true);  
        }  
    };  

    const handleUpdateTask = async () => {  
        if (taskTitle && taskDescription && taskDeadline && taskTime) {  
            const updatedTask = {  
                title: taskTitle,  
                description: taskDescription,  
                deadline: taskDeadline,  
                time: parseFloat(taskTime),  
            };  

            const updatedTasks = project.tasks.map(task =>  
                task.id === editingTaskId ? { ...updatedTask, id: editingTaskId } : task  
            );  
            const updatedProjects = projects.map(p => p.id === project.id ? { ...p, tasks: updatedTasks } : p);  
            setProjects(updatedProjects);  
            localStorage.setItem('projects', JSON.stringify(updatedProjects));  
            notify(`Task Updated: ${updatedTask.title}. Due by ${updatedTask.deadline} at ${updatedTask.time} hours.`);  
            handleClose();  
        } else {  
            alert("Please fill in all fields.");  
        }  
    };  

    const handleDelete = async (id) => {  
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
    }, []);  

    const tasks = project.tasks || [];  

    return (  
        <div className="p-4">  
            <button  
                onClick={() => setIsVisible(true)}  
                className="bg-blue-500 text-white rounded-md px-4 py-2 text-lg"  
            >  
                Add Task  
            </button>  

            {isVisible && (  
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">  
                    <div className="bg-white rounded-lg p-8 shadow-lg w-1/3">  
                        <h2 className="text-2xl font-semibold mb-4">{editingTaskId ? "Edit Task" : "Add Task"}</h2>  
                    <input
                            type="text"
                            placeholder="Title"
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="border rounded-md px-2 py-2 mb-2 w-full"
                            required
                        />

                        <textarea
                            placeholder="Description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            className="border rounded-md px-2 py-2 mb-2 w-full"
                            required
                        />

                        <input
                            type="date"
                            value={taskDeadline}
                            onChange={(e) => setTaskDeadline(e.target.value)}
                            className="border rounded-md px-2 py-2 mb-2 w-full"
                            required
                        />

                        <input
                            type="text"
                            placeholder="Hours"
                            value={taskTime}
                            onChange={(e) => setTaskTime(e.target.value)}
                            className="border rounded-md px-2 py-2 mb-2 w-full"
                            required
                        />

                        <button
                            onClick={editingTaskId ? handleUpdateTask : handleAddTask}
                            className="bg-blue-500 text-white rounded-md px-4 py-2 mb-4"
                        >
                            {editingTaskId ? "Update Task" : "Add Task"}
                        </button>
                        <button
                            onClick={handleClose}
                            className="bg-red-500 text-white rounded-md px-4 py-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {tasks.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Task List</h2>
                    <ul className="flex items-center justify-center flex-wrap gap-6 list-disc pl-5">
                        {tasks.map((task, index) => (
                            <li key={index} className="bg-white shadow-2xl h-44 w-52 rounded-md flex flex-col items-center justify-center mb-2">
                                <h2 className='bg-sky-400	 w-32 shadow-2xl text-black	text-xl	 flex rounded-md justify-center items-center'>{task.title}</h2>
                                <h3 className='text-slate-700'>Description: {task.description}</h3>
                                <h3 className='text-slate-700'>Deadline: {task.deadline}</h3>
                                <h3 className='text-slate-700'>Estimated Time: {task.time} hours</h3>
                                <div className="flex items-center justify-center gap-4">
                                    <button className='bg-transparent shadow-2xl border-4 border-black-200 border-t-black-300' onClick={() => handleEdit(task.id)}>
                                        <FaEdit />
                                    </button>
                                    <button className='bg-transparent shadow-2xl border-4 border-black-200 border-t-black-300' onClick={() => handleDelete(task.id)}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Task;