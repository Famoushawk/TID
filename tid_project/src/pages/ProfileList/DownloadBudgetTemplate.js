import React, { useState } from 'react';

const DownloadBudgetTemplate = () => {
  const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDownload = async () => {
    if (!name) {
      alert("Please enter your name");
      return;
    }
    try {
      const response = await fetch(`/api/generate-budget-template?name=${name}`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Budget_Template_${name}.xlsx`;
        link.click();
      } else {
        alert('Failed to generate the template');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error downloading the template');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
      />
      <button onClick={handleDownload} disabled={!name}>Download Budget Template</button>
    </div>
  );
};

export default DownloadBudgetTemplate;
