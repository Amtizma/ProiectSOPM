import React, {useEffect, useState} from 'react';
import './topbar.css';
import 'boxicons/css/boxicons.min.css';
import logo from './images/logo.png';
import ThemePopup from './ThemePopup';

function TopBar({ sortOrder, setSortOrder, tasks, categories, onUpdateLists  }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showThemePopup, setShowThemePopup] = useState(false);
    const [showAuto, setShowAuto] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
    const [showRulesPopup, setShowRulesPopup] = useState(false);
    const [selectedType, setSelectedType] = useState('task'); // 'task' or 'category'
    const [selectedTask, setSelectedTask] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");


    useEffect(() => {
        console.log('tasks:', tasks);
        console.log('categories:', categories);
    }, [tasks, categories]);

    const toggleRulesPopup = () => {
        setShowRulesPopup(!showRulesPopup);
        onUpdateLists(); // Call the function to update lists in the App component
    };
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
    };

    const toggleThemePopup = () => {
        setShowThemePopup(!showThemePopup);
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
    // Add necessary state and functions
    const [notificationRules, setNotificationRules] = useState({
        time: 0,
        target: 'task',
        timerId: null,
        customTimeUnit: 'minutes',  // Initialize with a default value
    });

    const handleRuleChange = (key, value) => {
        setNotificationRules((prevRules) => ({
            ...prevRules,
            [key]: value,
        }));
    };

    const setupNotifications = () => {
        const { time, customTimeUnit, target } = notificationRules;

        let timeInMilliseconds;
        if (customTimeUnit === 'minutes') {
            timeInMilliseconds = time * 60 * 1000;
        } else if (customTimeUnit === 'days') {
            timeInMilliseconds = time * 24 * 60 * 60 * 1000;
        } else {
            alert('Unsupported time unit');
            return;
        }

        if ('Notification' in window) {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    // Notification permission granted, set up the notification timer
                    const notificationTimer = setTimeout(() => {
                        new Notification(`Reminder for ${target}`, {
                            body: `It's time to check your ${target}.`,
                        });
                    }, timeInMilliseconds);

                    handleRuleChange('timerId', notificationTimer);
                } else {
                    alert('Notification permission denied');
                }
            });
        } else {
            alert('Notifications not supported in this browser');
        }
    };


    const requestNotificationPermission = async () => {
        try {
            await Notification.requestPermission();
            setupNotifications();
        } catch (error) {
            alert('Notification permission denied');
        }
    };

    useEffect(() => {
        // Cleanup function to clear the timer on component unmount
        return () => {
            clearTimeout(notificationRules.timerId);
        };
    }, [notificationRules.timerId]);

    const timeUnits = [
        { label: 'Minutes', value: 'minutes' },
        { label: 'Days', value: 'days' },
    ];

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
                                        <li onClick={toggleRulesPopup}>Reminders</li>
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
                                        <li onClick={() => setSortOrder('default')}>Default</li>
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
                            <button className="close-buttonn" onClick={toggleFeedbackPopup}>
                                X
                            </button>
                            <h2>Give Feedback</h2>
                            <p>What would you like to share with us?</p>
                            <textarea id="feedback-textarea" placeholder="Write your feedback here..." />
                            <button onClick={sendFeedback}>Send</button>
                        </div>
                    </div>
                )}
                {showRulesPopup && (
                    <div className="reminders-popup">
                        <div className="reminders-content">
                            <button className="close-buttonn" onClick={toggleRulesPopup}>
                                X
                            </button>
                            <label className="setReminder">Set Reminder! <br/> <br/></label>
                            <form onSubmit={(e) => e.preventDefault()}>
                                <label htmlFor="reminderTime" className="reminderLabel">In </label>
                                <div>
                                    <input className="timeInput"
                                           type="text"
                                           placeholder="Number of"
                                           onChange={(e) => {
                                               const input = e.target.value;
                                               if (/^\d*\.?\d*$/.test(input)) {
                                                   handleRuleChange('time', input);
                                               }
                                           }}
                                    />
                                    <select
                                        className="selectTime"
                                        value={notificationRules.customTimeUnit}
                                        onChange={(e) => handleRuleChange('customTimeUnit', e.target.value)}
                                    >
                                        {timeUnits.map((unit) => (
                                            <option key={unit.value} value={unit.value}>
                                                {unit.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <label htmlFor="reminderTime" className="reminderLabel"> </label>

                                <label htmlFor="reminderTarget" className="reminderLabel">Remind me about</label>
                                <select
                                    className="selectElement"
                                    id="reminderTarget"
                                    value={notificationRules.target}
                                    onChange={(e) => {
                                        handleRuleChange('target', e.target.value);
                                        setSelectedTask(e.target.value);
                                    }}
                                >
                                    <option value="task" disabled={!selectedTask}>
                                        Select a Task
                                    </option>
                                    {tasks.map((task) => (
                                        <option key={task}>
                                            {task}
                                        </option>
                                    ))}
                                    <option value="category" disabled={!selectedCategory}>
                                        Select a Category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <br/>
                                <button onClick={requestNotificationPermission}>Set Reminder</button>
                            </form>


                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;