import React, { useState } from 'react';
import {cats} from "./Category";

const Dropdown = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  let getColour = (value) => {
    for(let i = 0; i < cats.length; i++){
      if(cats[i].cat == value)
      {
        return cats[i].colour
      }
    }
  } 

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(getColour(value))
    console.log(document.getElementsByClassName("task"))
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggling}>
        {selectedOption || "Select an option"}
        <span className={`arrow ${isOpen ? "open" : ""}`}></span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li className="dropdown-list-item" onClick={onOptionClicked(option)} key={index}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;