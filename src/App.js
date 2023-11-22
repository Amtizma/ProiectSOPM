// Inside App.js

import React from 'react';
import './topbar.css'; // Import the TopBar CSS file
import TopBar from './topbar.js'; // Import the TopBar component

const App = () => {
  return (
    <div className="App">
      {/* Other content in your app */}
      <TopBar /> {/* Include the TopBar component */}
      {/* Other content in your app */}
    </div>
  );
};

export default App;
