import React, { useState, useEffect, useRef } from 'react';
import AddTaskForm from './AddTaskForm';
import './tasks.css';
import './tasks2.css';

const TaskColumn = ({ category, tasks, categories, onAddTask, onDeleteTask, onDeleteColumn, onMoveTask, onEditTask, setShowForm }) => {
    const [activeColumn, setActiveColumn] = useState('');
    const [showOptionsMenu, setShowOptionsMenu] = useState({});
    const [hoveredTask, setHoveredTask] = useState(null);
    const [showFilterOptions, setShowFilterOptions] = useState(false); // New state for filter options
    const [filterType, setFilterType] = useState('default'); // Default filter type
    const [editingTask, setEditingTask] = useState(null); // new state for editing task

    const resetEditingTask = () => {
        setEditingTask(null);
    };
    const handleEditTask = (taskId, shouldShowForm) => {
        const taskToEdit = tasks.find(task => task.id === taskId);
        setEditingTask(taskToEdit);
        if (shouldShowForm) {
            setShowForm(true);
        }
    };


    const toggleFilterOptions = () => {
        setShowFilterOptions(!showFilterOptions);
    };
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
    const applyFilter = (task) => {
        switch (filterType) {
            case 'byName':
                return task.name ? task.name.toLowerCase() : '';
            case 'byPriority':
                const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
                return String(task.priority ? priorityOrder[task.priority.toUpperCase()] : 4);
            default:
                return String(task.id); // Convert non-string values to strings
        }
    };


    const filteredTasks = tasks.slice().sort((a, b) => applyFilter(a).localeCompare(applyFilter(b)));


    return (
        <div className={`task-column ${activeColumn === category ? 'active' : ''}`}>
            {!['todo', 'ongoing', 'done'].includes(category) && (
                <button onClick={handleDeleteColumn} className="delete-column-button task-column-button">
                    x
                </button>
            )}
            <div className="filter-button" onClick={toggleFilterOptions}>
                Filter By
            </div>
            {showFilterOptions && (
                <div className="dropdown-menu">
                    <button className="filterButtons" onClick={() => setFilterType('default')}>Default</button>
                    <button className="filterButtons" onClick={() => setFilterType('byName')}>Name</button>
                    <button className="filterButtons" onClick={() => setFilterType('byPriority')}>Priority</button>
                </div>
            )}
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            {filteredTasks.map((task) => (
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
                                    <li onClick={() => handleEditTask(task.id)}>Edit</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    {hoveredTask === task && task.description && (
                        <div>
                            <div className="task-date">
                                {new Date(task.id).toLocaleString('en-GB')}
                            </div>
                        <div className="task-description">
                            {task.description}
                        </div>
                        </div>
                    )}
                </div>
            ))}
            <div className="form-container">
                <AddTaskForm onAddTask={onAddTask} category={category} onHighlight={handleColumnHighlight} editingTask={editingTask} onDeleteTask={onDeleteTask} setShowForm={setShowForm} resetEditingTask={resetEditingTask} />
            </div>
        </div>
    );
}

export default TaskColumn;