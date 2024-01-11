import React from 'react';
import CategoryPage from './Category';
import './categories.css';
import './App.css';
import './topbar.css';
import TopBar from './topbar';
import TaskPage from './AddTask';

const App = () => {
    return (
        <div className="App">
            <TopBar />
            <div className="categoriesAndTasks">
            <CategoryPage />
                <TaskPage/>
            </div>
        </div>

    );
};

export default App;
