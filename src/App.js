
// Function working with update

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLesson, setLoading, updateLesson } from './features/dataSlice';
import Sidebar from './components/sideBar';
import Content from './components/content';
import 'katex/dist/katex.min.css';
import './App.css';
import { generate } from 'random-words';
import katex from 'katex';

function App() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [equationToUpdate, setEquationToUpdate] = useState(null);
  const loading = useSelector((state) => state.data.loading);
  const currentLesson = useSelector((state) => state.data.currentLesson);

  // Generate a random equation from a predefined list
  const generateRandomEquation = () => {
    const equations = [
      'E = mc^2',
      '\\frac{a}{b} = c',
      'a^2 + b^2 = c^2',
      '\\int_0^1 x^2 \\, dx',
      '\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}',
    ];
    return equations[Math.floor(Math.random() * equations.length)];
  };

  // Generate a random description
  const generateRandomDescription = () => {
    const numWords = Math.floor(Math.random() * 5) + 5;
    const words = generate(numWords);
    return `Here is a random description based on generated words: ${words.join(' ')}.\n\n`;
  };

  // Handle generating new lesson data
  const handleGenerate = () => {
    const newEquation = generateRandomEquation();
    const lessonDescription = generateRandomDescription();
    dispatch(addLesson({ title: inputValue, description: lessonDescription, equation: newEquation }));
    dispatch(setLoading(true));
    setInputValue('');
    setEquationToUpdate(null); // Reset any ongoing equation updates
  };

  // Handle updating the equation
  const handleUpdateEquation = (updatedEquation) => {
    if (currentLesson) {
      // Update the equation in the current lesson without saving it to the sidebar
      dispatch(updateLesson({ equation: updatedEquation }));
      dispatch(setLoading(true));
    }
    setEquationToUpdate(null);
  };

  const renderEquation = (equation) => {
    return { __html: katex.renderToString(equation, { throwOnError: false }) };
  };

  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Content />
        {loading ? null : (
          <div className="equation-list">
            {currentLesson && (
              <div className="equation-item">
                <div className="equation-display">
                  <button onClick={() => setEquationToUpdate({ equation: currentLesson.equation })}>Update Equation</button>
                </div>
              </div>
            )}
          </div>
        )}

        {equationToUpdate && (
          <div className="update-equation">
            <div>
              <h3>Update Equation</h3>
              <textarea
                value={equationToUpdate.equation}
                onChange={(e) => setEquationToUpdate({ equation: e.target.value })}
              />
            </div>
            <div className="update-button">
              <div style={{display:"flex",alignItems:"center",gap:"30px"}}>
                <h4>Preview :</h4>
                <div dangerouslySetInnerHTML={renderEquation(equationToUpdate.equation)} />
              </div>
              <button onClick={() => handleUpdateEquation(equationToUpdate.equation)}>Update</button>
            </div>
          </div>
        )}

        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter lesson title..."
            disabled={loading}
          />
          <button
            onClick={handleGenerate}
            disabled={inputValue.trim() === ''}
            className={`generate-button ${inputValue.trim() === '' ? 'disabled' : ''}`}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;














