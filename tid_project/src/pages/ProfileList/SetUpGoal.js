import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';

const GoalContainer = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.medium};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const GoalInput = styled.input`
  width: calc(100% - 20px);
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.size.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  background-color: ${({ isLoading, theme }) => isLoading ? theme.colors.inputLoadingBg : theme.colors.inputBg};
  cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'text')};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.inputDisabledBg};
  }
`;

const GoalButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.buttonText};
  padding: 10px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.size.medium};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const Spinner = styled.div`
  border: 3px solid ${({ theme }) => theme.colors.buttonText};
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.size.small};
  margin-top: 10px;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.typography.size.small};
  margin-top: 10px;
  animation: fadeInOut 2s ease-out;

  @keyframes fadeInOut {
    0% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const SetUpGoal = () => {
  const [goal, setGoal] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedGoal, setSubmittedGoal] = useState(null);
  const maxGoal = 1000000;

  const inputRef = useRef(null);

  const handleGoalChange = useCallback((e) => {
    const value = e.target.value;
    const cleanedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    
    if (cleanedValue === '' || isNaN(Number(cleanedValue)) || Number(cleanedValue) < 0) {
      setError("Please enter a valid positive number.");
    } else {
      setError('');
    }

    setGoal(cleanedValue);
  }, []);

  const handleSubmitGoal = async () => {
    const parsedGoal = parseFloat(goal);
    
    if (isNaN(parsedGoal) || parsedGoal <= 0) {
      setError("Please enter a valid positive number.");
      return;
    }

    if (parsedGoal > maxGoal) {
      setError(`Please enter a goal less than or equal to ${maxGoal}.`);
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);
    setError('');

    try {
      const savedGoal = await saveGoal(goal);
      setSubmittedGoal(savedGoal);
      setGoal('');
      setTimeout(() => {
        setIsSuccess(true);
      }, 500);
    } catch (err) {
      console.error('Error saving goal:', err);
      setError('Failed to save goal after multiple attempts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error || isSuccess) {
      const timer = setTimeout(() => {
        setError('');
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, isSuccess]);

  return (
    <GoalContainer>
      <h2>Set Up Your Saving Goal</h2>
      {error && <ErrorMessage aria-live="assertive">{error}</ErrorMessage>}
      {isSuccess && (
        <>
          <SuccessMessage aria-live="assertive">
            Your goal of {submittedGoal} DKK has been set successfully!
          </SuccessMessage>
        </>
      )}
      
      <GoalInput
        ref={inputRef}
        type="text"
        placeholder="Enter your saving goal (e.g., 5000)"
        value={goal}
        onChange={handleGoalChange}
        min="0"
        step="any"
        disabled={isLoading}
        isLoading={isLoading}
      />
      
      <GoalButton onClick={handleSubmitGoal} disabled={!goal.trim() || isLoading}>
        {isLoading ? (
          <Spinner />
        ) : (
          'Set Goal'
        )}
      </GoalButton>
    </GoalContainer>
  );
};

export default SetUpGoal;

