import React from 'react';
// import LoginSignup from './LoginSignup'; // Importul noii componente
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
            <div className="categorii">
            <TaskPage/>
            </div>
            </div>
        </div>

    );
};
// const App = () => {
//   return (
//     <div>
      
//       <LoginSignup /> {/* Adăugarea componentei pentru login/signup */}
//     </div>
//         );
//       };

export default App;
