import React, { useState } from "react";

const ColorList = ({ colors }) => {
    const [activeColor, setActiveColor] = useState(null);

    const handleColorClick = (color) => {
        setActiveColor(color);
    };

    return (
        <div>
            <h2>Color List</h2>
            <ul>
                {colors.map((color) => (
                    <li
                        key={color}
                        onClick={() => handleColorClick(color)}
                        style={{
                            color: color,
                            cursor: "pointer",
                            padding: "10px",
                        }}
                        className={activeColor === color ? "active" : ""}
                    >
                        {color}
                    </li>
                ))}
            </ul>
            <p>Active Color: {activeColor || "None"}</p>
        </div>
    );
};

export default ColorList;
