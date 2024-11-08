import React, { useState } from 'react';

const BudgetTemplate = () => {
  
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [budgetItems, setBudgetItems] = useState([]);

  
  const handleAddItem = () => {
    if (category.trim() !== '' && amount.trim() !== '') {
      setBudgetItems([...budgetItems, { category, amount, note }]);
      setCategory(''); 
      setAmount(''); 
      setNote(''); 
    }
  };

  const handleDownload = () => {
    const content = `Budget Template:\n\n${budgetItems.map((item, index) => (
      `Category: ${item.category}\nAmount: $${item.amount}\nNote: ${item.note || 'No note'}\n`
    )).join('\n')}`;

    const file = new Blob([content], { type: 'text/plain' });

    const element = document.createElement('a');
    element.href = URL.createObjectURL(file);
    element.download = 'BudgetTemplate.txt';

    document.body.appendChild(element);
    element.click();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Budget Template</h2>

      {/* Input for category */}
      <div>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter category"
          className="border p-2"
        />
      </div>

      {/* Input for amount */}
      <div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="border p-2 mt-2"
        />
      </div>

      {/* Input for note */}
      <div>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Enter note (optional)"
          className="border p-2 mt-2"
        />
      </div>

      {/* Button to add the item to the budget list */}
      <button onClick={handleAddItem} className="mt-4 p-2 bg-blue-500 text-white">
        Add Item
      </button>

      {/* Display added budget items */}
      {budgetItems.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl">Your Budget:</h3>
          <ul className="list-disc ml-5">
            {budgetItems.map((item, index) => (
              <li key={index} className="mb-2">
                <strong>Category:</strong> {item.category} <br />
                <strong>Amount:</strong> ${item.amount} <br />
                <strong>Note:</strong> {item.note || 'No note'}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Download button */}
      {budgetItems.length > 0 && (
        <button onClick={handleDownload} className="mt-4 p-2 bg-green-500 text-white">
          Download Budget Template
        </button>
      )}
    </div>
  );
};

export default BudgetTemplate;
