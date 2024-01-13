import React, {useState} from 'react';
import CategoryPage from './Category';
import './categories.css';
import './App.css';
import './topbar.css';
import TopBar from './topbar';
import TaskPage from './AddTask';


const App = () => {
    const [sortOrder, setSortOrder] = useState('default');
    return (
        <div className="App">
            <TopBar sortOrder={sortOrder} setSortOrder={setSortOrder}/>
            <div className="categoriesAndTasks">
            <CategoryPage />
                <TaskPage sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>
        </div>

    );
};

export default App;
