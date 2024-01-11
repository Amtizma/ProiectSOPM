import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import './tasks.css';

function TaskColumn({ category, tasks, onAddTask, onDeleteTask, onDeleteColumn }) {
    const [activeColumn, setActiveColumn] = useState('');
    const [showOptionsMenu, setShowOptionsMenu] = useState({});

    const handleColumnHighlight = () => {
        setActiveColumn(category); // Highlight the column
        setTimeout(() => setActiveColumn(''), 2000); // Remove highlight after 2 seconds
    };

    const handleDeleteColumn = () => {
        onDeleteColumn(category);
    };

    const handleDeleteTask = (taskId) => {
        onDeleteTask(category, taskId);
    };

    const toggleOptions = (taskId) => {
        setShowOptionsMenu(prevState => ({
            ...prevState,
            [taskId]: !prevState[taskId]
        }));
    };

    return (
        <div className={`task-column ${activeColumn === category ? 'active' : ''}`}>
            <h2>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            {!['todo', 'ongoing', 'done'].includes(category) && (
                <button onClick={handleDeleteColumn} className="delete-column-button">
                    x
                </button>
            )}
            {tasks.map(task => (
                <div key={task.id} className='task' style={{ backgroundColor: task.color }}>
                    {task.description}
                    <div className="task-options">
                        <button onClick={() => toggleOptions(task.id)} className='option-button'>
                            ...
                        </button>
                        {showOptionsMenu[task.id] && (
                            <div className="option-menu">
                                <ul>
                                    <li onClick={() => handleDeleteTask(task.id)}>Remove</li>
                                    <li>Move to</li>
                                    <li>Change Category</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <div className='form-container'>
                <AddTaskForm onAddTask={onAddTask} category={category} onHighlight={handleColumnHighlight} />
            </div>
        </div>
    );
}

export default TaskColumn;