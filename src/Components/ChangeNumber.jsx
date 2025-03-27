import React, { useState } from 'react';

const Counter = ({stock}) => {

 const [count, setCount] = useState(1);

 const increaseCount = () => {
      setCount(count + 1);
  };

 const decreaseCount = () => {
    setCount(count - 1);
  };

 return (
    <div style={{fontSize:21,display:'flex', gap:12}}>
      <button onClick={decreaseCount} disabled={count === 1} className='btn'>-</button>
      {count}
      <button onClick={increaseCount} disabled={count >= stock? true : false } className='btn'>+</button>
    </div>
  );
 };

 export default Counter;