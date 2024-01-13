import React, { useState, useEffect } from 'react';
import CategoryPage from './Category';
import './categories.css';
import './App.css';
import './topbar.css';
import TopBar from './topbar';
import TaskPage from './AddTask';
import { cats } from "./Category";
import { tsks } from "./AddTask";


const App = () => {
    const [sortOrder, setSortOrder] = useState('default');
    const [handledCats, setHandledCats] = useState([]);
    const [handledTasks, setHandledTasks] = useState([]);
    const [updateLists, setUpdateLists] = useState(false);
    const handleUpdateLists = () => {
        setUpdateLists(true); // Set the flag to trigger the update
    };



    // Use useEffect to update handledCats and handledTasks when updateLists is true
    useEffect(() => {
        if (updateLists) {
            setHandledCats(cats.map(cat => cat.cat));
            setHandledTasks(Object.values(tsks).flat());
            setUpdateLists(false); // Reset the flag after updating
        }
    }, [updateLists]);

    return (
        <div className="App">
            <TopBar sortOrder={sortOrder} setSortOrder={setSortOrder} tasks={handledTasks} categories={handledCats} onUpdateLists={handleUpdateLists} />
            <div className="categoriesAndTasks">
                <CategoryPage />
                <TaskPage sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>
        </div>
    );
};

export default App;
