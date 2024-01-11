import React, { useState, useEffect, useRef } from 'react';
import AddTaskForm from './AddTaskForm';
import './tasks.css';
import './tasks2.css';

function TaskColumn({ category, tasks, categories, onAddTask, onDeleteTask, onDeleteColumn, onMoveTask }) {
    const [activeColumn, setActiveColumn] = useState('');
    const [showOptionsMenu, setShowOptionsMenu] = useState(null); // Holds the taskId of the open menu
    const [hoveredTask, setHoveredTask] = useState(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const closeMenuOnOutsideClick = (event) => {
            if (
                !event.target.closest('.option-menu') &&
                !event.target.closest('.option-button') &&
                !event.target.closest('.task-column-button')
            ) {
                setShowOptionsMenu(null);
            }
        };

        document.body.addEventListener('click', closeMenuOnOutsideClick);

        return () => {
            document.body.removeEventListener('click', closeMenuOnOutsideClick);
        };
    }, []);

    const handleColumnHighlight = () => {
        setActiveColumn(category);
        setTimeout(() => setActiveColumn(''), 2000);
    };

    const handleDeleteColumn = () => {
        onDeleteColumn(category);
    };

    const handleMoveTask = (targetCategory) => {
        if (hoveredTask) {
            onMoveTask(hoveredTask.id, targetCategory);
            toggleOptions(hoveredTask.id);
        }
    };

    const handleDeleteTask = (taskId) => {
        onDeleteTask(category, taskId);
        toggleOptions(taskId);
    };

    const toggleOptions = (taskId) => {
        setShowOptionsMenu((prevTaskId) => (prevTaskId === taskId ? null : taskId));
    };

    return (
        <div className={`task-column ${activeColumn === category ? 'active' : ''}`}>
            {!['todo', 'ongoing', 'done'].includes(category) && (
                <button onClick={handleDeleteColumn} className="delete-column-button task-column-button">
                    x
                </button>
            )}
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            {Array.isArray(tasks) &&
                tasks.map((task) => (
                    <div
                        key={task.id}
                        className="task"
                        style={{ backgroundColor: task.color }}
                        onMouseEnter={() => setHoveredTask(task)}
                        onMouseLeave={() => setHoveredTask(null)}
                    >
                        <div className="nameandcircle">
                            {task.priority && (
                                <div className={`priority-circle ${task.priority.toLowerCase()}`}></div>
                            )}
                            {task.name && <h3 className="task-name">{task.name}</h3>}
                            <button
                                onClick={() => toggleOptions(task.id)}
                                className="option-button"
                                ref={buttonRef}
                            >
                                ...
                            </button>
                        </div>
                        <div className="task-options">
                            {showOptionsMenu === task.id && (
                                <div className="option-menu">
                                    <ul>
                                        <li onClick={() => handleDeleteTask(task.id)}>
                                            Remove
                                        </li>
                                        <li>
                                            Move to
                                            <ul>
                                                {categories.map((targetCategory) => (
                                                    <li
                                                        key={targetCategory}
                                                        onClick={() =>
                                                            handleMoveTask(targetCategory)
                                                        }
                                                    >
                                                        {targetCategory.charAt(0).toUpperCase() +
                                                            targetCategory.slice(1)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                        <li>Edit</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        {hoveredTask === task && task.description && (
                            <div className="task-description">
                                {task.description}
                            </div>
                        )}
                    </div>
                ))}
            <div className="form-container">
                <AddTaskForm onAddTask={onAddTask} category={category} onHighlight={handleColumnHighlight} />
            </div>
        </div>
    );
}

export default TaskColumn;
