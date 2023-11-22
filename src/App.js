import React from 'react';
import React from 'react';
import LoginSignup from './LoginSignup'; // Importul noii componente
import CategoryPage from './Category';
import './categories.css';
import './topbar.css';
import TopBar from './topbar';

const App = () => {
    return (
        <div className="App">
            {/* Restul codului tău existent */}
            <TopBar /> {/* Adaugă aici componenta TopBar */}
            <div className="categoriesAndTasks">
            <CategoryPage />
            <div className="categorii">
                <div className="categorie">
                    <h2>Todo</h2>
                    {/* Adaugă aici lista cu activități todo */}
                </div>
                <div className="categorie">
                    <h2>Ongoing</h2>
                    {/* Adaugă aici lista cu activități în desfășurare */}
                </div>
                <div className="categorie">
                    <h2>Done</h2>
                    {/* Adaugă aici lista cu activități realizate */}
                </div>
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
