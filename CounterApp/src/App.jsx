import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);  // State to manage counter value

  // Function to increment counter
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // decrement counter
  const handleDecrement = () => {
    setCount(count - 1);
  };

  // reset counter
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div className="app-container">
      <div className="counter-card">
        <h1 className="title">Counter Application</h1>

        <div className="counter-display">
          <span className="counter-value">{count}</span>
        </div>

        <div className="button-group">
          <button className="btn btn-decrement" onClick={handleDecrement}>Decrement</button>
          <button className="btn btn-reset" onClick={handleReset} >Reset</button>
          <button className="btn btn-increment" onClick={handleIncrement} >Increment</button>
        </div>

        <div className="counter-info">
          <p>Current Count: <strong>{count}</strong></p>
        </div>

      </div>
    </div>
  );
}

export default App;


