import React, { useState } from 'react';
import './tasks.css';
import TaskColumn from './TaskColumn';

function AddTask() {
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    done: []
  });

  const handleAddTask = (taskDescription, category) => {
    const newTask = { id: Date.now(), description: taskDescription };
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

  return (
      <div className="task-containers">
        <div className='task-columns'>
          {Object.entries(tasks).map(([category, tasks]) => (
              <TaskColumn
                  key={category}
                  category={category}
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onDeleteTask={deleteTasks}
              />
          ))}
        </div>
      </div>
  );
}

export default AddTask;
