import React from 'react';
import CategoryPage from './Category';
import './categories.css';
import './App.css';
import './topbar.css';
import TopBar from './topbar';

const HomeSection = () => {
    return (
        <div className="App">
            <TopBar />
            <div className="categoriesAndTasks">
                <CategoryPage />
                <div className="categorii">
                    <div className="categorie">
                        <h2>Todo</h2>
                    </div>
                    <div className="categorie">
                        <h2>Ongoing</h2>
                    </div>
                    <div className="categorie">
                        <h2>Done</h2>
                    </div>
                </div>
            </div>
        </div>

    );
};
export default HomeSection;