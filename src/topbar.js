import React, { useState, useEffect } from 'react';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas'; // Import html2canvas library

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
    const [showShareMenu, setShowShareMenu] = useState(false);
    const [saveAsPdfClicked, setSaveAsPdfClicked] = useState(false);


    const savePNG = async () => {
        const appElement = document.getElementsByClassName('App')[0];
    
        // Capture screenshot using html2canvas
        const canvas = await html2canvas(appElement);
    
        // Convert canvas to data URL
        const dataUrl = canvas.toDataURL();
    
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = dataUrl;
    
        // Set the download attribute with a file name
        link.download = 'screenshot.png';
    
        // Trigger a click on the link to prompt the download
        link.click();
      };

    useEffect(() => {
        if (saveAsPdfClicked) {
            // Call saveAsPDF only when the "Save as PDF" button is clicked
            saveAsPDF();
            // Reset the state to prevent unnecessary future calls
            setSaveAsPdfClicked(false);
        }
    }, [saveAsPdfClicked]);

    const toggleAuto = () => {
        setShowAuto(!showAuto);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const toggleMenu = () => {
        setShowMenu(!showMenu);
        if (showThemePopup) {
            setShowThemePopup(false);
        }

        if (showShareMenu) {
            setShowShareMenu(false);
        }
    };

    const toggleThemePopup = () => {
        setShowThemePopup(!showThemePopup);
    };

    const toggleFeedbackPopup = () => {
        setShowFeedbackPopup(!showFeedbackPopup);
    };

    const toggleShareMenu = () => {
        setShowShareMenu(!showShareMenu);
    };

    const sendFeedback = () => {
        const feedbackText = document.getElementById('feedback-textarea').value;
        const emailSubject = 'Feedback for Your App';
        const mailtoLink = `mailto:dianastphx@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(feedbackText)}`;
        window.location.href = mailtoLink;
        toggleFeedbackPopup(); // Close the feedback popup after sending
    };

    const saveAsPDF = () => {
        const appElement = document.getElementsByClassName('top-bar')[0];
        const pdfOptions = {
            margin: 10,
            filename: 'your_document.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };

        html2pdf(appElement, pdfOptions);
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
                            Filters
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

                        <button
          className={`button ${showShareMenu ? 'active' : ''}`}
          onClick={toggleShareMenu}>
          Share
          {showShareMenu && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={() => setSaveAsPdfClicked(true)}>Save as PDF</li>
                <li onClick={savePNG}>Save as PNG</li>
              </ul>
            </div>
          )}
        </button>


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
};

export default TopBar;
