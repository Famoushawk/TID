import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';

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

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabled};
    cursor: not-allowed;
  }
`;

const SetUpGoal = () => {
  const theme = useTheme(); 
  const [goal, setGoal] = useState('');
  const [submittedGoal, setSubmittedGoal] = useState(null);

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const handleSubmitGoal = () => {
    if (goal.trim()) {
      setSubmittedGoal(goal);
      setGoal('');
      alert(`Your goal has been set to: ${goal}`); 
    }
  };

  return (
    <GoalContainer>
      <h2 style={{ fontSize: theme.typography.size.large }}>Set Up Your Saving Goal</h2>
      {submittedGoal ? (
        <p style={{ color: theme.colors.success }}>
          Your current goal: <strong>{submittedGoal}</strong>
        </p>
      ) : (
        <>
          <GoalInput
            type="text"
            placeholder="Enter your saving goal (e.g., $5000)"
            value={goal}
            onChange={handleGoalChange}
          />
          <GoalButton onClick={handleSubmitGoal} disabled={!goal.trim()}>
            Set Goal
          </GoalButton>
        </>
      )}
    </GoalContainer>
  );
};

export default SetUpGoal;
