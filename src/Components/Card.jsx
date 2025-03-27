import React from "react";
import ColorList from "./ColorList";
import Counter from "./ChangeNumber";

const Card = ({ name, Quantity, img, stock, onAddToCart }) => {
  return (
    <div className="card">
      <img src={img} alt="" className="product-img" />
      <div>
        <h1>{name}</h1>
        <h2>{Quantity}</h2>
      </div>
      <div className="info">
        Colors:
        <ColorList colors={colors} />
        Size:
        <Counter stock={stock} />
      </div>
      <button onClick={onAddToCart} style={{ marginTop: '10px', padding: '10px', backgroundColor: '#61dafb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Add to Cart
      </button>
    </div>
  );
};

export default Card;