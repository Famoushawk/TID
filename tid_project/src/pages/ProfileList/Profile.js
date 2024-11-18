import React, { useState } from "react";
import styled from "styled-components";
import ProfileOptions from "./ProfileOptions";

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

  const handleClick = (title) => {
    if (title === "Set a goal for saving up") {
      setShowGoalInput(true);
    }
  };

  const handleGoalSubmit = () => {
    alert(`Your new goal "${goal}" has been set!`);
    setShowGoalInput(false);
    setGoal(""); 
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
          <GoalButton onClick={handleGoalSubmit} disabled={!goal.trim()}>
            Save Goal
          </GoalButton>
        </GoalContainer>
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

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default Profile;
