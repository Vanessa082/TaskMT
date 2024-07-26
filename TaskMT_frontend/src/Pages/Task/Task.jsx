import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Task = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [tasks, setTasks] = useState([]);
    const [taskTime, setTaskTime] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);

    const handleClick = () => {
        setIsVisible(true);
    };

    const handleClose = () => {
        setIsVisible(false);
        setTaskTitle('');
        setTaskDescription('');
        setTaskDeadline('');
        setTaskTime('');
        setEditingTaskId(null);
    };

    const fetchTasks = async () => {
        const localTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(localTasks);
        const response = await fetch('YOUR_API_END_POINT');
        const data = await response.json();
        setTasks(data);
    };

    const handleAddTask = async () => {
        if (taskTitle && taskDescription && taskDeadline && taskTime) {
            const newTaskTime = parseFloat(taskTime);
            const totalHours = 24;

            const currentTotalHours = tasks.reduce((acc, task) => acc + (task.time || 0), 0);

            if (currentTotalHours + newTaskTime <= totalHours) {
                const newTask = {
                    title: taskTitle,
                    description: taskDescription,
                    deadline: taskDeadline,
                    time: newTaskTime,
                    completed: false, // New property to indicate completion  
                };

                await fetch('YOUR_API_END_POINT/tasks', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTask),
                });

                const updatedTasks = [...tasks, newTask];
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                setTasks(updatedTasks);
                handleClose();
            } else {
                alert("You can't add this task. You have exceeded the total hours for the day.");
            }
        } else {
            alert("Please fill in all fields.");
        }
    };

    const handleDelete = async (id) => {
        await fetch(`YOUR_API_END_POINT/tasks/${id}`, { method: 'DELETE' });

        const updatedTasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    const handleEdit = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        setTaskTitle(taskToEdit.title);
        setTaskDescription(taskToEdit.description);
        setTaskTime(taskToEdit.time);
        setTaskDeadline(taskToEdit.deadline);
        setEditingTaskId(id);
        setIsVisible(true);
    };

    const handleUpdateTask = async () => {
        if (taskTitle && taskDescription && taskDeadline && taskTime) {
            const updatedTask = {
                title: taskTitle,
                description: taskDescription,
                deadline: taskDeadline,
                time: parseFloat(taskTime),
            };

            await fetch(`YOUR_API_END_POINT/tasks/${editingTaskId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedTask),
            });

            const updatedTasks = tasks.map(task =>
                task.id === editingTaskId ? updatedTask : task
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            setTasks(updatedTasks);
            handleClose();
        } else {
            alert("Please fill in all fields.");
        }
    };

    // New function to toggle task completion  
    const toggleTaskCompletion = async (id) => {
        const taskToUpdate = tasks.find(task => task.id === id);
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

        await fetch(`YOUR_API_END_POINT/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask),
        });

        const updatedTasks = tasks.map(task =>
            task.id === id ? updatedTask : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        setTasks(updatedTasks);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="p-4">
            <button
                onClick={handleClick}
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
                            <li key={index} className="bg-white shadow-2xl h-48 w-64 rounded-md flex flex-col items-center justify-center mb-2">
                                <h2 className='bg-sky-50 w-32 shadow-2xl text-blue-600 flex rounded-md justify-center items-center'>{task.title}</h2>
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