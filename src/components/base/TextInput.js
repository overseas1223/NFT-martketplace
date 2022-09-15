import React from "react";
import '../../styles/base/TextInput.css';

//Base Input Component
//Usage: <Input width='550px' height='30px' />

const TextInput = ({
  width,
  height, 
  placeholder='default input',
  icon,
  type,
  inputType,
  setValue,
  value
}) => {
  return (
    <div className="search-wrapper">
      <div
        className="search-container"
        style={{
          width:`${width}`,
          height:`${height}`,
          background: `radial-gradient(
                    circle,
                    rgba(255, 255, 255, 0.05) 0%,
                    rgba(48,118,234,0.2) 0%,
                    rgba(255, 255, 255, 0.05) 70%
                )`,
          border: '1px solid rgb(204, 204, 204)'
        }}
      >
        {inputType === "textarea" ? 
          <textarea
            id="search" 
            placeholder={placeholder}
            style={{ borderRadius: '0px', resize: 'none' }}
            onChange={(e) => { setValue(e.target.value) }}
          >
              {value}
          </textarea>
        :
          <input 
            id="search" 
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => { setValue(e.target.value) }}
          />
        }
          {icon}
      </div>
    </div>
  );
};

export default TextInput;
