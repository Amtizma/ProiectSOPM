import React, { useState } from 'react';
import TaskCategories from './AddTaskDef';
import AddNewCategory from './AddTaskForm';

const TaskPage = () => {
    const [categories, setCategories] = useState(['Category 1']);

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    };

    return (
        <div className= "categories">
            <TaskCategories categories={categories} />
            <AddNewCategory addCategory={addCategory} />
        </div>
    );
};

export default TaskPage;
