import React, { useState } from "react";
import * as EXFormSelect from "../css/exhibitionCreateCss/EXFormSelect";

const SelectEX = ({ onChange, options, EXvalue, EXname }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (e) => {
    onChange(e);
    setDropdownOpen(false);
  };

  const foundObj = options[EXvalue];

  return (
    <EXFormSelect.SelectWrapper>
      <EXFormSelect.SelectLabel onClick={toggleDropdown}>
        {EXvalue ? foundObj : "선택해 주세요"}
        <span>&#x25BC;</span>
      </EXFormSelect.SelectLabel>
      {dropdownOpen && (
        <EXFormSelect.SelectDropdown>
          {Object.keys(options).map((key, index) => (
            <EXFormSelect.SelectOption
              key={index}
              data-value={key}
              data-name={EXname}
              onClick={handleOptionClick}
            >
              <EXFormSelect.SelectSpan>{options[key]}</EXFormSelect.SelectSpan>
            </EXFormSelect.SelectOption>
          ))}
        </EXFormSelect.SelectDropdown>
      )}
    </EXFormSelect.SelectWrapper>
  );
};

export default SelectEX;
