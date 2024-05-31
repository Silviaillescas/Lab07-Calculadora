import React, { useState } from 'react';
import Display from './components/Display';
import Button from './components/Button'; 
import './App.css';
import './components/Button.css'; 

function App() {
  const [current, setCurrent] = useState('0');

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setCurrent('0');
    } else if (value === '+/-') {
      setCurrent(current.startsWith('-') ? current.slice(1) : '-' + current);
    } else if (['+', '-', '*', '/'].includes(value)) {
      setCurrent(current + ' ' + value + ' ');
    } else if (value === '=') {
      try {
        const result = eval(current);
        if (result < 0 || result > 999999999) {
          setCurrent('ERROR');
        } else {
          setCurrent(result.toLocaleString(undefined, {maximumFractionDigits: 9}).replace(/,/g, ''));
        }
      } catch (e) {
        setCurrent('Error');
      }
    } else {
      // Prevents exceeding 9 characters unless it's a new operation
      const newValue = current === '0' ? value : current + value;
      if (newValue.replace(/[^0-9.]/g, '').length <= 9) {
        setCurrent(newValue);
      }
    }
  };

  return (
    <div className="calculator">
      <Display value={current} />
      <div className="keyboard">
        {'7 8 9 / 4 5 6 * 1 2 3 - 0 . = +'.split(' ').map(char => (
          <Button key={char} label={char} onClick={handleButtonClick} />
        ))}
        <Button label="C" onClick={handleButtonClick} />
        <Button label="+/-" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
