import React, { useState } from 'react';
import Parse from 'parse';

const DownloadBudgetTemplate = () => {
  const [name, setName] = useState('');

  const handleDownload = async () => {
    if (!name) {
      alert('Please enter your name');
      return;
    }

    try {
      const result = await Parse.Cloud.run('generateBudgetTemplate', { name });


      const byteCharacters = atob(result);
      const byteNumbers = Array.from(byteCharacters, char => char.charCodeAt(0));
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Budget_Template_${name}.xlsx`;
      link.click();
    } catch (error) {
      console.error('Error generating budget template:', error);
      alert('Failed to generate the budget template. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleDownload} disabled={!name}>
        Download Budget Template
      </button>
    </div>
  );
};

export default DownloadBudgetTemplate;
