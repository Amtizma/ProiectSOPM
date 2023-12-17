import './topbar.css';
import 'boxicons/css/boxicons.min.css';
import logo from './images/logo.png';
import React, { useState } from 'react';



const TopBar = () => {

  const [showAuto, setShowAuto] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  const toggleAuto = () => {
    setShowAuto(!showAuto);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleFeedbackPopup = () => {
    setShowFeedbackPopup(!showFeedbackPopup);
  };


  return (
<div className="top-bar">

<div className="left-section">

<img src={logo} alt='To Do' className='logo'  />

<h1 className="charter-title">Charter for</h1>
</div>

<div className="right-section">
<div className="buttons">
<button className={`button ${showAuto ? 'active' : ''}`} onClick={toggleAuto}>
  Automation
  {showAuto && (
    <div className="dropdown-menu2">
      <ul>
        <li>Rules</li>
        <li onClick={toggleFeedbackPopup}>Send feedback</li>
        
      </ul>
    </div>
  )}
</button>


<button className={`button ${showFilters ? 'active' : ''}`} onClick={toggleFilters}>
  Filters
  {showFilters && (
    <div className="dropdown-menu1">
      <ul>
        <li>By Deault</li>
        <li>By ????</li>
        <li>By Category</li>
      </ul>
    </div>
  )}
</button>

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

{showFeedbackPopup && (
        <div className="feedback-popup">
          <div className="feedback-content">
            <h2>Give Feedback</h2>
            <p>What would you like to share with us?</p>
            <textarea placeholder="Write your feedback here..." />
            <button onClick={toggleFeedbackPopup}>Send</button>
          </div>
        </div>
      )}

</div>
</div>
</div>
  );
};

export default TopBar;
