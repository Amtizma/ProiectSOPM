import React, { useState } from 'react';
import './tasks.css';
import TaskColumn from './TaskColumn';
import AddColumnPopup from './AddColumnPopup';

function AddTask() {
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    done: []
  });

  const handleAddTask = (taskDescription, category, color) => {
    const newTask = { id: Date.now(), description: taskDescription, color: color };
    setTasks(prevTasks => ({
      ...prevTasks,
      [category]: [...prevTasks[category], newTask]
    }));
  };

  const deleteTasks = (category, taskId) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[category] = updatedTasks[category].filter(task => task.id !== taskId);
      return updatedTasks;
    });
  };
  const deleteColumn = columnName => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[columnName];
    setTasks(updatedTasks);
  };


  const [showAddColumnPopup, setShowAddColumnPopup] = useState(false);

  const addColumn = () => {
    setShowAddColumnPopup(true);
  };

  const handleAddColumn = (columnName) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [columnName]: [],
    }));
  };

  return (
    <div className="task-containers">
      <div className="task-columns">
        {Object.entries(tasks).map(([category, tasks]) => (
          <TaskColumn
            key={category}
            category={category}
            tasks={tasks}
            onAddTask={handleAddTask}
            onDeleteTask={deleteTasks}
            onDeleteColumn={deleteColumn}
          />
        ))}
        <button onClick={addColumn} className="add-column-button">
          Add a column
        </button>
      </div>
      {showAddColumnPopup && (
         <div className="add-column-popup-overlay">
         <div className="add-column-popup">
           <AddColumnPopup onClose={() => setShowAddColumnPopup(false)} onAddColumn={handleAddColumn} />
         </div>
       </div>
      )}
    </div>
  );
}

export default AddTask;
