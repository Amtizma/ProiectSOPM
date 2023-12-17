import './topbar.css';
import 'boxicons/css/boxicons.min.css';
import logo from './images/logo.png';
import React, { useState } from 'react';



const TopBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
<div className="top-bar">

<div className="left-section">

<img src={logo} alt='To Do' className='logo'  />

<h1 className="charter-title">Charter for</h1>
</div>

<div className="right-section">
<div className="buttons">
<button className="button">Automation</button>
<button className="button">Filters</button>
<button className="button">Share</button>

<button className={`button settings-button ${showMenu ? 'active' : ''}`} onClick={toggleMenu}>
<i className='bx bx-dots-horizontal-rounded'></i>
  {showMenu && (
      <div className="dropdown-menu">
        <ul>
          <li>Change Theme</li>
          <li>Logout</li>
        </ul>
      </div>
  )}
</button>

</div>
</div>
</div>
  );
};


export default TopBar;
