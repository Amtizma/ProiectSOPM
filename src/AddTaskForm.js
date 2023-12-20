import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { cats } from './Category';

const AddTaskForm = ({ onAddTask, category }) => {
  var handledCats = [];
  for (let i = 0; i < cats.length; i++) {
    handledCats[i] = cats[i].cat;
  }

  const [selectedColor, setSelectedColor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState('');

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSelectColor = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      onAddTask(task, category, selectedColor);
      setTask('');
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
          <input
            className="category-name-textbox"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
          />
          <button type="submit" className="confirm-add-category-button">
            Add Task
          </button>
          <button type="button" onClick={handleCancel} className="cancel-add-category-button">
            X
          </button>

          <div className="Dropdown">
            <Dropdown options={handledCats} onSelectColor={handleSelectColor} />
          </div>
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
