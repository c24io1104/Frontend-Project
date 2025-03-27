import React, { useState } from 'react';

const ColorList = ({ colors }) => {

  const [activeColor, setActiveColor] = useState(null);

  const handleColorClick = (color) => {
    setActiveColor(color);
  };

  return (
    <div>
      <div style={{display:"flex",gap:'7px'}}>
        {colors.map(color => (
          <span
            key={color}
            onClick={() => handleColorClick(color)}
            style={{ color: color, cursor: 'pointer',borderRadius:"90px" }}
            className={activeColor === color ? 'active' : 'inactive'}
          >
            <div style={{backgroundColor:color,width:'80px',height:'80px',borderRadius:"100px"}}>
            </div>
          </span>
        ))}
      </div>
    </div>
  );
};
export default ColorList;