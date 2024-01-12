import React, { useState, useEffect} from 'react';
import './topbar.css';
import 'boxicons/css/boxicons.min.css';
import logo from './images/logo.png';
import ThemePopup from './ThemePopup';

function TopBar({ sortOrder, setSortOrder }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showThemePopup, setShowThemePopup] = useState(false);
    const [showAuto, setShowAuto] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

    const toggleAuto = () => {
        setShowAuto(!showAuto);
        setShowFilters(false); // Close filters menu
        setShowMenu(false); // Close the main menu
        setShowThemePopup(false); // Close theme popup
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
        setShowAuto(false); // Close automation menu
        setShowMenu(false); // Close the main menu
        setShowThemePopup(false); // Close theme popup
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        setShowAuto(false); // Close automation menu
        setShowFilters(false); // Close filters menu
        setShowThemePopup(false); // Close theme popup
    };

    const toggleThemePopup = () => {
        setShowThemePopup(!showThemePopup);
        setShowAuto(false); // Close automation menu
        setShowFilters(false); // Close filters menu
        setShowMenu(false); // Close the main menu
    };

    const toggleFeedbackPopup = () => {
        setShowFeedbackPopup(!showFeedbackPopup);
    };

    const sendFeedback = () => {
        const feedbackText = document.getElementById('feedback-textarea').value;
        const emailSubject = 'Feedback for Your App';
        const mailtoLink = `mailto:dianastphx@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(feedbackText)}`;
        window.location.href = mailtoLink;
        toggleFeedbackPopup(); // Close the feedback popup after sending
    };

    const closeMenuOnOutsideClick = (event) => {
        if (
            !event.target.closest('.dropdown-menu') &&
            !event.target.closest('.button') &&
            !event.target.closest('.settings-button')
        ) {
            setShowAuto(false);
            setShowFilters(false);
            setShowMenu(false);
            setShowThemePopup(false);
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', closeMenuOnOutsideClick);

        return () => {
            document.body.removeEventListener('click', closeMenuOnOutsideClick);
        };
    }, []);

    return (
        <div>
            <div className="top-bar">
                <div className="left-section">
                    <img src={logo} alt='To Do' className='logo' />
                    <h1 className="charter-title">Charter for</h1>
                </div>
                <div className="right-section">
                    <div className="buttons">
                        <button className={`button ${showAuto ? 'active' : ''}`} onClick={toggleAuto}>
                            Automation
                            {showAuto && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li>Rules</li>
                                        <li onClick={toggleFeedbackPopup}>Send feedback</li>
                                    </ul>
                                </div>
                            )}
                        </button>

                        <button className={`button ${showFilters ? 'active' : ''}`} onClick={toggleFilters}>
                            Column Filters
                            {showFilters && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li onClick={() => setSortOrder('default')}>By Default</li>
                                        <li onClick={() => setSortOrder('byTasks')}>By No. of tasks</li>
                                        <li onClick={() => setSortOrder('byName')}>By Column Name</li>
                                    </ul>
                                </div>
                            )}
                        </button>

                        <button className="button">Share</button>

                        <button
                            className={`button settings-button ${showMenu ? 'active' : ''}`}
                            onClick={toggleMenu}>
                            <i className='bx bx-dots-horizontal-rounded'></i>
                            {showMenu && (
                                <div className="dropdown-menu">
                                    <ul>
                                        <li onClick={toggleThemePopup}>Change Theme</li>
                                    </ul>
                                </div>
                            )}
                        </button>
                    </div>
                    {showThemePopup && (
                        <div className="theme-popup">
                            <ThemePopup onClose={toggleThemePopup} />
                        </div>
                    )}
                </div>
                {showFeedbackPopup && (
                    <div className="feedback-popup">
                        <div className="feedback-content">
                            <button className="close-button" onClick={toggleFeedbackPopup}>
                                X
                            </button>
                            <h2>Give Feedback</h2>
                            <p>What would you like to share with us?</p>
                            <textarea id="feedback-textarea" placeholder="Write your feedback here..." />
                            <button onClick={sendFeedback}>Send</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TopBar;
