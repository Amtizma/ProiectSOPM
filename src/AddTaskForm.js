import React, { useState } from 'react';
import Dropdown from './Dropdown';
import {cats} from "./Category";
import {_pastelColors, assignBackgroundColor} from "./CategoryDef";

const AddTaskForm = ({ onAddTask, category}) => {

  const [showForm, setShowForm] = useState(false);
  const [task, setTask] = useState('');

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() !== '') {
      onAddTask(task, category);
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
            <form onSubmit={handleSubmit}>
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
                <Dropdown options={cats} />
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
