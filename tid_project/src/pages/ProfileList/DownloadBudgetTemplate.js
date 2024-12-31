import React, { useState, useEffect, useRef, useCallback } from 'react';
import Parse from 'parse';

const DownloadBudgetTemplate = () => {

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [valid, setValid] = useState(false);
  const blobURLRef = useRef(null);

const isValidName = useCallback((input) => /^[A-Za-zÀ-ÿ\s'-]+$/.test(input.trim()), []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError('');
      setSuccess('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error, success]);

  useEffect(() => {
    return () => {
      if (blobURLRef.current) {
        URL.revokeObjectURL(blobURLRef.current);
        blobURLRef.current = null;
      }
    };
  }, []);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setName(input);

   
    if (isValidName(input)) {
      setError('');
      setValid(input.trim() !== '');
    } else {
      setValid(false);
    }
  
    setSuccess('');
  };

  const handleDownload = async () => {
    if (!name.trim()) {
      setError('Name cannot be empty.');
      setSuccess('');
      return;
    }

    if (!isValidName(name)) {
      setError('Please enter a valid name (letters, spaces, hyphens, and apostrophes only).');
      setSuccess('');
      return;
    }

    setError('');
    setLoading(true);
    setSuccess('');

    try {
      const result = await Parse.Cloud.run('generateBudgetTemplate', { name });
      if (!result) throw new Error('Server returned an invalid response.');

      const byteCharacters = atob(result);
      const byteArray = new Uint8Array(Array.from(byteCharacters, (c) => c.charCodeAt(0)));
      const blob = new Blob([byteArray], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

 
      if (blobURLRef.current) URL.revokeObjectURL(blobURLRef.current);
      blobURLRef.current = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobURLRef.current;
      link.download = `Budget_Template_${name}.xlsx`;
      link.click();

      setSuccess('Your budget template is downloading!');
    } catch (err) {
      console.error('Error generating budget template:', err);
      if (err.code === Parse.Error.CONNECTION_FAILED) {
        setError('Network error. Please check your connection and try again.');
      } else if (err.message.includes('invalid response')) {
        setError('The server returned an invalid response. Please contact support.');
      } else {
        setError(err.message || 'Failed to generate the budget template. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleInputChange}
        aria-label="Enter your name"
        aria-describedby={error ? 'error-message' : undefined}
        disabled={loading}
      />
      {error && (
        <p id="error-message" style={{ color: 'red' }} aria-live="assertive" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p style={{ color: 'green', fontWeight: 'bold' }} aria-live="polite" role="status">
          {success}
        </p>
      )}
      {valid && !error && !loading && name && (
        <p style={{ color: 'blue', fontSize: '12px' }}>Name looks good!</p>
      )}
      <button
        onClick={handleDownload}
        disabled={loading || !name.trim()}
        aria-label={
          loading
            ? 'Generating the budget template. Please wait.'
            : !name.trim()
            ? 'Button disabled. Enter a valid name to proceed.'
            : 'Download Budget Template'
        }
      >
        {loading ? (
          <>
            <span className="spinner" /> Generating...
          </>
        ) : (
          'Download Budget Template'
        )}
      </button>
    </div>
  );
};

export default DownloadBudgetTemplate;
