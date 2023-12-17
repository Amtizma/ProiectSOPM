import React, { useState } from 'react';
import './SettingsMenu.css';

const Menu = () => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className="menu-container">
            <button className="button settings-button" onClick={toggleMenu}>
                <i className='bx bx-dots-horizontal-rounded'></i>
            </button>
            {showMenu && (
                <div className="dropdown-menu">
                    <ul>
                        <li>Change Theme</li>
                        <li>Logout</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Menu;
