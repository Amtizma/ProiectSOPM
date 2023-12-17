import React, { useState } from 'react';
import './topbar.css';
import 'boxicons/css/boxicons.min.css';
import logo from './images/logo.png';
import ThemePopup from './ThemePopup';

const TopBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showThemePopup, setShowThemePopup] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        if (showThemePopup) {
            setShowThemePopup(false);
        }
    };

    const toggleThemePopup = () => {
        setShowThemePopup(!showThemePopup);
    };

    return (
        <div>
            <div className="top-bar">
                <div className="left-section">
                    <img src={logo} alt='To Do' className='logo' />
                    <h1 className="charter-title">Charter for</h1>
                </div>

                <div className="right-section">
                    <div className="buttons">
                        <button className="button">Automation</button>
                        <button className="button">Filters</button>
                        <button className="button">Share</button>

                        <button
                            className={`button settings-button ${showMenu ? 'active' : ''}`}
                            onClick={toggleMenu}
                        >
                            <i className='bx bx-dots-horizontal-rounded'></i>
                            {showMenu && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li onClick={toggleThemePopup}>Change Theme</li>
                                        <li>Logout</li>
                                    </ul>
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {showThemePopup && (
                <div className="theme-popup">
                    <ThemePopup onClose={toggleThemePopup} />
                </div>
            )}

        </div>
    );
};

export default TopBar;
