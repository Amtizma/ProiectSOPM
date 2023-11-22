import logo from './logo.svg';
import './App.css';


const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="buttons">
        <button className="button">Automation</button>
        <button className="button">Filters</button>
        <button className="button">Share</button>
      </div>
    </div>
  );
};



const App = () => {
  return (
    <div className="App">
      {/* Restul codului tău existent */}
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
  );
};


export default App;

