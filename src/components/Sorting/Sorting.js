import { useEffect, useState } from "react";
import "./Sorting.scss";

export default function Sorting({criteria,onSelect}){
      const [selectedOption, setSelectedOption] = useState(criteria[0]);
      const [isOpen, setIsOpen] = useState(false);
      useEffect(() => {
        setSelectedOption(selectedOption);
      }, [selectedOption]);
      const handleOptionSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
      };

    return (
    <div className="sorting">
      <label className="sorting__lable">SortBy: </label>
      <div className="sorting__input" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? (
          <span className="sorting__selected">{selectedOption}</span>
        ) : (
          <span className="sorting__placeholder">place holder</span>
        )}
      </div>
      {isOpen && (
        <ul className="sorting__options">
          {criteria.map((option, index) => (
            <li
              key={index}
              className="sorting__option"
              onClick={() => handleOptionSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
    )
}