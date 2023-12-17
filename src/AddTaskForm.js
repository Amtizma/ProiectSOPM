// AddTaskForm.js
import React, { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [task, setTask] = useState('');
  const [category, setCategory] = useState('todo'); // set default category

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      onAddTask(task, category);
      setTask('');
      setCategory('todo'); // reset to default category
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="ongoing">Ongoing</option>
          <option value="done">Done</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTaskForm;
