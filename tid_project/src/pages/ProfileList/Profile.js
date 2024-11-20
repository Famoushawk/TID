import React, { useState } from "react";
import styled from "styled-components";
import ProfileOptions from "./ProfileOptions";
import { ProfileService } from '../../api/services/ProfileService';

const profileData = [
  {
    title: "Budget Templates",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: "./wallet.png",
  },
  {
    title: "Set goal for saving up",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: "./target.png",
  },
  {
    title: "Diagram of expenses",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: "./calculator.png",
  },
];

const Profile = () => {
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goal, setGoal] = useState("");
  const [userGoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserGoals = async () => {
    try {
      const goals = await ProfileService.getCurrentUserGoals();
      setUserGoals(goals);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (title) => {
    if (title === "Set goal for saving up") {
      setShowGoalInput(true);
    }
  };

  const handleGoalSubmit = async () => {
    if (!goal.trim()) return;
    
    try {
      setLoading(true);
      await ProfileService.setGoal(goal);
      await fetchUserGoals();
      setShowGoalInput(false);
      setGoal("");
    } catch (error) {
      console.error('Error setting goal:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ListContainer>
        {profileData.map((item, index) => (
          <ProfileOptions
            key={index}
            {...item}
            onClick={() => handleClick(item.title)}
          />
        ))}
      </ListContainer>

      {showGoalInput && (
        <GoalContainer>
          <h3>Set Your Saving Goal</h3>
          <GoalInput
            type="text"
            placeholder="Please, enter new saving goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <GoalButton onClick={handleGoalSubmit} disabled={!goal.trim() || loading}>
            Save Goal
          </GoalButton>
        </GoalContainer>
      )}

      {userGoals.length > 0 && (
        <GoalsListContainer>
          <h3>Your Goals</h3>
          {userGoals.map((goal, index) => (
            <GoalItem key={goal.objectId || index}>
              {goal.Goal}
              <GoalDate>{new Date(goal.createdAt).toLocaleDateString()}</GoalDate>
            </GoalItem>
          ))}
        </GoalsListContainer>
      )}
    </div>
  );
};

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
  list-style-type: none;
`;

const GoalContainer = styled.div`
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f1f1f1;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 12px;
    text-align: center;
    color: #333;
  }
`;

const GoalsListContainer = styled(GoalContainer)`
  margin-top: 20px;
`;

const GoalItem = styled.div`
  padding: 12px;
  margin: 8px 0;
  background: white;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GoalDate = styled.span`
  font-size: 0.8em;
  color: #666;
`;

const GoalInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
`;

const GoalButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default Profile;