import React, { useState } from 'react';
import './tasks.css';
import TaskColumn from './TaskColumn';

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
    const isBaseCategory = ['todo', 'ongoing', 'done'].includes(category);

    if (!isBaseCategory) {
      setTasks(prevTasks => {
        const updatedTasks = { ...prevTasks };
        updatedTasks[category] = updatedTasks[category].filter(task => task.id !== taskId);
        return updatedTasks;
      });
    } else {
      console.log(`Nu puteți șterge task-uri din categoria ${category}.`);
      // Poți adăuga o notificare sau acțiuni suplimentare pentru utilizator aici
    }
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
        <button onClick={addColumn} className="add-column-button">Add a column</button>
      </div>
    </div>
  );
};

export default AddTask;