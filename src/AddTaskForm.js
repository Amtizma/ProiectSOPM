import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { cats } from './Category';
import "./form.css";
const AddTaskForm = ({ onAddTask, category }) => {
  var handledCats = [];
  for (let i = 0; i < cats.length; i++) {
    handledCats[i] = cats[i].cat;
  }

  const [selectedColor, setSelectedColor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState('');
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('');

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      onAddTask(task, category, selectedColor, name, priority);
      setTask('');
      setPriority('')
      setName('')
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setTask('');
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit} className={`task ${selectedColor ? 'with-color' : ''}`}>
          <button type="button" onClick={handleCancel} className="cancel-add-category-button">
            X
          </button>
          <input
            className="category-name-textbox"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a task"
          />
          <input
            className="category-name-textbox"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task description"
          />
          <div className="Dropdown">
            <Dropdown options={handledCats} onSelectColor={handleSelectColor} />
          </div>
          <div className="priority-options">
            <button
              type="button"
              className={`priority-button low ${priority === 'LOW' ? 'selected' : ''}`}
              onClick={() => setPriority('LOW')}
            >
              LOW
            </button>
            <button
              type="button"
              className={`priority-button medium ${priority === 'MEDIUM' ? 'selected' : ''}`}
              onClick={() => setPriority('MEDIUM')}
            >
              MEDIUM
            </button>
            <button
              type="button"
              className={`priority-button high ${priority === 'HIGH' ? 'selected' : ''}`}
              onClick={() => setPriority('HIGH')}
            >
              HIGH
            </button>
          </div>
          <button type="submit" className="confirm-add-category-button">
            Add Task
          </button>
        </form>
      ) : (
        <button onClick={handleButtonClick} className="add-category-button">
          Add Task
        </button>
      )}
    </div>
  );
};

export default AddTaskForm;
