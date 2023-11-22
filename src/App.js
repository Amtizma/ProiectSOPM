import logo from './logo.svg';
import './App.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="buttons">
        <button className="button">Automation</button>
        <button className="button">Filters</button>
        <button className="button">Share</button>
      </div>
    </div>
  );
};

export default TopBar;
