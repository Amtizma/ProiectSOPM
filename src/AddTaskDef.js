import React from 'react';

const TaskCategories = ({ categories }) => {
    return (
        <div> <div>
            <h2>Todo</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        
        </div>
        <div>
            <h2>Ongoing</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
  
        </div>
        <div>
            <h2>Done</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
  
        </div>
        </div>
       
        
    );
};

export default TaskCategories;
