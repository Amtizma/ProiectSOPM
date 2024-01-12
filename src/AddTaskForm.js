import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { cats } from './Category';
import "./form.css";

const AddTaskForm = ({ onAddTask, category }) => {
  var handledCats = cats.map(cat => cat.cat);

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
      setPriority('');
      setName('');
      setShowForm(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setTask('');
  };

  return (
    <div className="task-form-container">
      {showForm ? (
        <form onSubmit={handleSubmit} className={`task-form ${selectedColor ? 'with-color' : ''}`}>
          <div className="input-container">
            <input
              className="category-name-textbox"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task title"
            />
            <input
              className="category-name-textbox"
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task description"
            />
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
          <div className="Dropdown">
            <Dropdown options={handledCats} onSelectColor={handleSelectColor} />
          </div>
          <div className="action-buttons">
            <button type="submit" className="confirm-add-category-button" style={{ backgroundColor: `var(--theme-color)` }}>
              Add Task
            </button>
            <button type="button" onClick={handleCancel} className="cancel-add-category-button">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button onClick={handleButtonClick} className="add-category-button">
          Add new Task
        </button>
      )}
    </div>
  );
};

export default AddTaskForm;
