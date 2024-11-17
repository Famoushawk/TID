import React, { useState } from "react";
import styled from "styled-components";
import ProfileOptions from "./ProfileOptions";

const profileData = [
  {
    title: "Download Budget Template",
    description: "Click to download a budget template.",
    imageUrl: './wallet.png',
    type: "download",
    fileUrl: '/path/to/budget-template.xlsx'
  },
  {
    title: "Set goal for saving up",
    description: "Click to set up a saving goal.",
    imageUrl: './target.png',
    type: "goal"
  },
  {
    title: "Diagram of expenses",
    description: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    imageUrl: './calculator.png',
    type: "diagram"
  }
];

const Profile = () => {
  const [selectedDiagram, setSelectedDiagram] = useState(false);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goal, setGoal] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const handleClick = (type) => {
    if (type === "diagram") {
      setSelectedDiagram(true);
    } else {
      setSelectedDiagram(false);
    }
    if (type === "goal") {
      setShowGoalInput(true);
    }
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();
    alert(`Goal: ${goal} with amount: $${goalAmount}`);
    setShowGoalInput(false);
    setGoal("");
    setGoalAmount("");
  };

  return (
    <Container>
      <ListContainer>
        {profileData.map((item, index) => (
          item.type === "download" ? (
            <DownloadLink href={item.fileUrl} key={index} download>
              <ProfileOptions {...item} />
            </DownloadLink>
          ) : (
            <ProfileOptions
              key={index}
              {...item}
              onClick={() => handleClick(item.type)}
            />
          )
        ))}
      </ListContainer>

      {showGoalInput && (
        <GoalContainer>
          <h3>Set Up Saving Goal</h3>
          <GoalForm onSubmit={handleGoalSubmit}>
            <Input
              type="text"
              placeholder="Enter goal description"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
            <Input
              type="number"
              placeholder="Enter goal amount"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
            />
            <SubmitButton type="submit">Save Goal</SubmitButton>
          </GoalForm>
        </GoalContainer>
      )}

      {selectedDiagram && (
        <DiagramContainer>
          <h3>Diagram of Expenses</h3>
          <Diagram>
            <span>Rent: 40%</span>
            <span>Groceries: 25%</span>
            <span>Transport: 15%</span>
            <span>Others: 20%</span>
          </Diagram>
        </DiagramContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  font-family: 'Arial', sans-serif;
`;

const ListContainer = styled.ul`
  display: flex;
  margin-top: 4px;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  padding: 0 8px;
  list-style-type: none;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const DownloadLink = styled.a`
  text-decoration: none;
`;

const GoalContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f0f8ff;
  max-width: 400px;
  margin: 20px auto;
`;

const GoalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  margin: 5px 0;
  transition: 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 20px;
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const DiagramContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Diagram = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  span {
    display: block;
    background: lightblue;
    padding: 5px;
    border-radius: 4px;
  }
`;

export default Profile;
