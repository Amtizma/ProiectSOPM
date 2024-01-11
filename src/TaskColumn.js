import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import './tasks.css';
import './tasks2.css';

function TaskColumn({ category, tasks, categories, onAddTask, onDeleteTask, onDeleteColumn, onMoveTask }) {
    const [activeColumn, setActiveColumn] = useState('');
    const [showOptionsMenu, setShowOptionsMenu] = useState({});
    const [hoveredTask, setHoveredTask] = useState(null); // New state to track hovered task

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
        setShowOptionsMenu((prevState) => ({
            ...prevState,
            [taskId]: !prevState[taskId],
        }));
    };

    return (
        <div className={`task-column ${activeColumn === category ? 'active' : ''}`}>
            {!['todo', 'ongoing', 'done'].includes(category) && (
                <button onClick={handleDeleteColumn} className="delete-column-button">
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
                        {task.priority && (
                            <div className={`priority-circle ${task.priority.toLowerCase()}`}></div>
                        )}
                        {task.name && <h3>{task.name}</h3>}
                        <div className="task-options">
                            <button
                                onClick={() => toggleOptions(task.id)}
                                className="option-button"
                            >
                                ...
                            </button>
                            {showOptionsMenu[task.id] && (
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
                                        <li>Change Category</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        {hoveredTask === task && task.description && (
                            <>
                                {task.description}
                            </>
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
