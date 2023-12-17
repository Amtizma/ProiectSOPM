import './topbar.css';
import 'boxicons/css/boxicons.min.css';
import logo from './images/logo.png';

const TopBar = () => {
  return (
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
          <button className="button settings-button">
            <i className='bx bx-dots-horizontal-rounded'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
