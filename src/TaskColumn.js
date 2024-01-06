import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm';

function TaskColumn({ category, tasks, onAddTask, onDeleteTask , onDeleteColumn}) {
    const [activeColumn, setActiveColumn] = useState('');

    const handleColumnHighlight = () => {
        setActiveColumn(category); // Highlight the column
        setTimeout(() => setActiveColumn(''), 2000); // Remove highlight after 2 seconds
    };

    const handleDeleteTask = (taskId) => {
        onDeleteTask(category, taskId);
    };
    const handleDeleteColumn = () => {
        onDeleteColumn(category);
    };

    return (
        <div className={`task-column ${activeColumn === category ? 'active' : ''}`}>
            <button onClick={handleDeleteColumn} className="delete-column-button">
                x
            </button>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            {tasks.map(task => (
                <div key={task.id} className='task' style={{ backgroundColor: task.color }}>
                    {task.description}
                    <button onClick={() => handleDeleteTask(task.id)} className='delete-category-button'>
                        Remove
                    </button>
                </div>
            ))}
            <div className='form-container'>
                <AddTaskForm onAddTask={onAddTask} category={category} onHighlight={handleColumnHighlight} />
            </div>
        </div>
    );
}

export default TaskColumn;
