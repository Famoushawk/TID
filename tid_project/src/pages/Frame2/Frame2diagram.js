import React, { useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import html2canvas from 'html2canvas';

const BudgetTemplateWithDiagram = () => {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [budgetItems, setBudgetItems] = useState([]);
  const [elements, setElements] = useState([]);

  const handleAddItem = () => {
    if (category.trim() !== '' && amount.trim() !== '') {
      const newItem = { category, amount, note };
      setBudgetItems([...budgetItems, newItem]);

      const newElement = {
        id: `node-${budgetItems.length}`,
        type: 'default',
        data: { label: `${category}\n$${amount}` },
        position: { x: 200, y: 100 + budgetItems.length * 150 },
      };
      setElements([...elements, newElement]);

      setCategory(''); 
      setAmount(''); 
      setNote(''); 
    }
  };

  
  const handleDownload = () => {
    
    const content = `Budget Template:\n\n${budgetItems.map((item, index) => (
      `Category: ${item.category}\nAmount: $${item.amount}\nNote: ${item.note || 'No note'}\n`
    )).join('\n')}`;

   
    html2canvas(document.getElementById('diagram')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const file = new Blob([content], { type: 'text/plain' });

     
      const element = document.createElement('a');
      const imgElement = document.createElement('a');
      
      
      element.href = URL.createObjectURL(file);
      element.download = 'BudgetTemplateWithDiagram.txt';

      // Download image
      imgElement.href = imgData;
      imgElement.download = 'BudgetDiagram.png';

      // Append and trigger the downloads
      document.body.appendChild(element);
      element.click();
      document.body.appendChild(imgElement);
      imgElement.click();
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Budget Template with Diagram</h2>

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

      {/* Render the diagram */}
      <div id="diagram" style={{ width: '600px', height: '600px', marginTop: '20px' }}>
        <ReactFlow
          elements={elements}
          style={{ width: '100%', height: '100%', border: '1px solid black' }}
        />
      </div>

      {/* Download button */}
      {budgetItems.length > 0 && (
        <button onClick={handleDownload} className="mt-4 p-2 bg-green-500 text-white">
          Download Budget Template with Diagram
        </button>
      )}
    </div>
  );
};

export default BudgetTemplateWithDiagram;
