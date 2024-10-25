'use client';  

import { useState, useEffect } from 'react';
import clsx from 'clsx';

const themes = ['Light', 'Dark', 'Neon'];

export default function Calculator() {
  const [theme, setTheme] = useState('Light');
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value: string) => setInput((prev) => prev + value);

  const calculate = () => {
    try {
      const evaluatedInput = input
        .replace(/(\d+)%/g, (_, num) => (parseFloat(num) / 100).toString())
        .replace(/x/g, '*')
        .replace(/X/g, '*');

      const evaluatedResult = eval(evaluatedInput).toString();
      setResult(parseFloat(evaluatedResult).toFixed(0)); 
      setInput(''); 
    } catch {
      setResult('Error');
    }
  };

  const clear = () => {
    setInput('');
    setResult('');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') calculate();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div
        className={clsx(
          'p-8 max-w-md w-full h-[700px] shadow-lg rounded-lg transition-all relative',
          theme === 'Light' && 'bg-white text-black',
          theme === 'Dark' && 'bg-gray-800 text-white', 
          theme === 'Neon' && 'bg-purple-700 text-white' 
        )}
      >
        <h1 className="text-4xl font-bold mb-4">Ngitunc!</h1>

        <div className="absolute top-4 right-4 flex flex-col items-center">
          <span className="text-lg font-bold mb-2">Theme</span>
          <div className="relative w-36 h-8 bg-gray-300 rounded-full flex items-center p-1">
            <div
              className={clsx(
                'w-10 h-6 rounded-full bg-blue-500 transition-transform',
                theme === 'Light' && 'translate-x-0',
                theme === 'Dark' && 'translate-x-12',
                theme === 'Neon' && 'translate-x-24'
              )}
            />
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={themes.indexOf(theme)}
              onChange={(e) => setTheme(themes[Number(e.target.value)])}
              className="absolute opacity-0 w-36 cursor-pointer"
            />
          </div>
        </div>

        {/* Display */}
        <div
          className="p-4 rounded mb-2 text-right text-3xl shadow"
          style={{
            backgroundColor: theme === 'Neon' ? 'white' : 'inherit', // Set background to white for Neon
            color: theme === 'Neon' ? 'purple' : 'inherit', // Set text color to purple for Neon
          }}
        >
          {result || input || '0'}
        </div>

        {/* Number and Operator Buttons */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {['7', '8', '9', '/'].map((v) => (
            <button
              key={v}
              onClick={() => handleClick(v)}
              className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
              style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
            >
              {v}
            </button>
          ))}
          {['4', '5', '6', 'x'].map((v) => (
            <button
              key={v}
              onClick={() => handleClick(v)}
              className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
              style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
            >
              {v}
            </button>
          ))}
          {['1', '2', '3', '+'].map((v) => (
            <button
              key={v}
              onClick={() => handleClick(v)}
              className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
              style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
            >
              {v}
            </button>
          ))}
          <button
            onClick={() => handleClick('0')}
            className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl col-span-2"
            style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
          >
            0
          </button>
          <button
            onClick={() => handleClick('.')}
            className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
            style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
          >
            .
          </button>
          <button
            onClick={() => handleClick('%')}
            className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
            style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
          >
            %
          </button>
          <button
            onClick={() => handleClick('Math.sqrt(')}
            className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
            style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
          >
            √
          </button>
          <button
            onClick={() => handleClick('**2')}
            className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
            style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
          >
            x²
          </button>
          <button
            onClick={() => handleClick('(')}
            className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
            style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
          >
            (
          </button>
          <button
            onClick={() => handleClick(')')}
            className="p-4 bg-gray-200 rounded shadow hover:shadow-md text-2xl"
            style={{ color: theme === 'Dark' ? 'black' : theme === 'Neon' ? 'purple' : 'inherit' }}
          >
            )
          </button>
        </div>

        {/* Clear and Enter Buttons */}
        <div className="flex mt-2 space-x-2">
          <button
            onClick={clear}
            className="p-4 bg-red-500 text-white rounded shadow hover:shadow-md flex-1"
          >
            Clear
          </button>
          <button
            onClick={calculate}
            className="p-4 bg-green-500 text-white rounded shadow hover:shadow-md flex-1"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}
