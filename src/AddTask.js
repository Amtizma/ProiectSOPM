import React, { useState } from 'react';
import './tasks.css';
import TaskColumn from './TaskColumn';

function AddTask() {
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    done: []
  });
  const moveTask = (sourceCategory, taskId, targetCategory) => {
    setTasks(prevTasks => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[sourceCategory] = updatedTasks[sourceCategory] || [];
      const taskToMove = updatedTasks[sourceCategory].find(task => task.id === taskId);

      if (!taskToMove) {
        console.error(`Task with ID ${taskId} not found.`);
        return updatedTasks;
      }

      updatedTasks[sourceCategory] = updatedTasks[sourceCategory].filter(task => task.id !== taskId);

      updatedTasks[targetCategory] = updatedTasks[targetCategory] || [];
      updatedTasks[targetCategory] = [...updatedTasks[targetCategory], taskToMove];

      return updatedTasks;
    });
  };

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
  

  const addColumn = () => {
    const columnName = prompt('Introduceți numele coloanei:');
    if (columnName) {
      setTasks(prevTasks => ({
        ...prevTasks,
        [columnName]: []
      }));
    }
  };

  const deleteColumn = columnName => {
    const updatedTasks = { ...tasks };
    delete updatedTasks[columnName];
    setTasks(updatedTasks);
  };

  return (
    <div className="task-containers">
      <div className="task-columns">
        {Object.entries(tasks).map(([category, categoryTasks]) => (
            <TaskColumn
                key={category}
                category={category}
                tasks={categoryTasks}
                categories={Object.keys(tasks)}
                onAddTask={handleAddTask}
                onDeleteTask={deleteTasks}
                onDeleteColumn={deleteColumn}
                onMoveTask={(taskId, targetCategory) => moveTask(category, taskId, targetCategory)}
            />
        ))}
        <button onClick={addColumn} className="add-column-button">Add a column</button>
      </div>
    </div>
  );
};

export default AddTask;

