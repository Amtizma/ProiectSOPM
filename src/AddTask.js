import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import './tasks.css'; // make sure this path is correct

function AddTask() {
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], done: [] });
  const [activeColumn, setActiveColumn] = useState('');

  const handleAddTask = (taskDescription, category) => {
    const newTask = { id: Date.now(), description: taskDescription };
    setTasks(prevTasks => ({
      ...prevTasks,
      [category]: [...prevTasks[category], newTask]
    }));
    setActiveColumn(category); // Highlight the column where the new task is added
    setTimeout(() => setActiveColumn(''), 2000); // Remove highlight after 2 seconds
  };

  return (
    <div>
      <div className='form-container'>
        <AddTaskForm onAddTask={handleAddTask} />
      </div>
      <div className='task-categories-container'>
        <div className='task-columns'>
          {Object.entries(tasks).map(([category, tasks]) => (
            <div key={category} className={`task-column ${activeColumn === category ? 'active' : ''}`}>
              <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
              {tasks.map(task => (
                <div key={task.id} className='task'>{task.description}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddTask;
