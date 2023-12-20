import React from 'react';
import './ThemePopup.css';

const ThemePopup = ({ onClose }) => {
    const changeTheme = (color1, color2) => {
        const topBar = document.querySelector('.top-bar');
        const App = document.querySelector('.App');
        const addColumnButton = document.querySelector('.add-column-button');

        if (topBar) {
            topBar.style.backgroundColor = color1;
        }
        if (App) {
            App.style.backgroundColor = color2;
        }
        if (addColumnButton) {
            addColumnButton.style.backgroundColor = color2; // Schimbăm culoarea butonului
        }
    };



    return (
        <div className="theme-popup">
            <div className="theme-content">
                <h3>Choose a Theme</h3>
                <div className="theme-buttons">
                    <button style={{ backgroundColor: 'lightblue', color: 'white' }} className="theme-button" onClick={() => changeTheme('#eef9f0', 'lightblue')}>Default</button>
                    <button style={{ backgroundColor: 'pink', color: 'white' }} className="theme-button" onClick={() => changeTheme('#FF90BC', '#FFC0D9')}>Barbie</button>
                    <button style={{ backgroundColor: 'gray', color: 'white' }} className="theme-button" onClick={() => changeTheme('#4F4A45', '#6C5F5B')}>Oppenheimer</button>
                    <button style={{ backgroundColor: '#860A35', color: 'white' }} className="theme-button" onClick={() => changeTheme('#F3F3F3', '#860A35')}>Christmas</button>
                </div>
                <button onClick={onClose} className="close-button">Close</button>
            </div>
        </div>
    );
};

export default ThemePopup;
