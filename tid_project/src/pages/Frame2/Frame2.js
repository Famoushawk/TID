
import React, { useState } from 'react';

const Frame2 = () => {
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);

  const handleAddGoal = () => {
    if (goal.trim() !== '') {
      setGoals([...goals, goal]);
      setGoal('');
    }
  };

  const handleDownload = () => {
    const diagramContent = `
      Budget Template Diagram:
      Start -> Define Budget Categories -> Track Expenses -> Set Savings Goals -> Review Monthly
    `;
    const goalsContent = goals.length
      ? `Goals:\n${goals.map((goal, index) => `${index + 1}. ${goal}`).join('\n')}\n`
      : 'No goals set yet.\n';
    
    const content = `${diagramContent}\n\n${goalsContent}`;
    const file = new Blob([content], { type: 'text/plain' });
    
    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'BudgetGoalsAndDiagram.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Frame 2 - Goal Setting</h2>

      
      {/* Input and Add Button for Goals */}
      <div className="mb-4">
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Enter your goal"
          className="border p-2"
        />
        <button onClick={handleAddGoal} className="ml-2 p-2 bg-blue-500 text-white">
          Add Goal
        </button>
      </div>
      
      {/* List of Goals */}
      {goals.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl mb-2">Your Goals:</h3>
          <ul className="list-disc ml-5">
            {goals.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Download Button */}
      <button onClick={handleDownload} className="mt-4 p-2 bg-green-500 text-white">
        Download Goals and Diagram
      </button>
    </div>
  );
};

export default Frame2;
