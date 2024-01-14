import React, {useState} from 'react';
import CategoryPage from './Category';
import './categories.css';
import './App.css';
import './topbar.css';
import TopBar from './topbar';
import TaskPage from './AddTask';
import { useEffect } from 'react';
import { initKeycloak, getKeycloakInstance } from './keycloak';

const App = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
      const init = async () => {
        try {
          await initKeycloak();
          const authenticated = await getKeycloakInstance().authenticated;
          setAuthenticated(authenticated);
  
          if (authenticated) {
            // Get user information
            const userInfo = await getKeycloakInstance().loadUserInfo();
            setUserInfo(userInfo);
            const userName = userInfo["given_name"];
            document.getElementById("charter-title").innerText = "Charter for " + userName;
          }
        } catch (error) {
          console.error('Keycloak initialization failed:', error);
        }
      };
  
      init();
    }, []);
  
    const logout = async () => {
      try {
        await getKeycloakInstance().logout();
      } catch (error) {
        console.error('Keycloak logout failed:', error);
      }
    };

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
