import React, { useState } from "react";
import styled from "styled-components";

const ProfileOptions = ({ title, description, imageUrl, onClick }) => {
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goal, setGoal] = useState("");

  const handleGoalSubmit = () => {
    alert(`Your new goal "${goal}" has been set!`);
    setShowGoalInput(false);
    setGoal("");
  };

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  return (
    <ListOptions>
      <StateLayer onClick={onClick}>
        <LeadingElement>
          <ImageWrapper>
            <Icon src={imageUrl} alt={`${title} icon`} />
          </ImageWrapper>
        </LeadingElement>
        <Content>
          <HeadlineAndReviews>{title}</HeadlineAndReviews>
          <SupportingText>
            <Description>{description}</Description>
          </SupportingText>
        </Content>
      </StateLayer>
      <DividerWrapper>
        <Divider />
      </DividerWrapper>

      {title === "Set a goal for saving up" && (
        <GoalContainer>
          {showGoalInput ? (
            <>
              <GoalInput
                type="text"
                placeholder="Please, enter your saving goal"
                value={goal}
                onChange={handleGoalChange}
              />
              <GoalButton onClick={handleGoalSubmit} disabled={!goal.trim()}>
                Save Goal
              </GoalButton>
            </>
          ) : (
            <GoalButton onClick={() => setShowGoalInput(true)}>
              Set up Goal
            </GoalButton>
          )}
        </GoalContainer>
      )}
    </ListOptions>
  );
};

const ListOptions = styled.li`
  display: flex;
  min-height: 88px;
  width: 100%;
  flex-direction: column;
  justify-content: start;
  cursor: pointer;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const StateLayer = styled.button`
  display: flex;
  width: 100%;
  align-items: flex-start;
  gap: 16px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 12px 16px;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background: #f0f0f0;
  }

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const LeadingElement = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: start;
  width: 80px;
`;

const ImageWrapper = styled.div`
  border-radius: 16px;
  display: flex;
  width: 80px;
  flex-direction: column;
`;

const Icon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  min-width: 240px;
  flex-direction: column;
  font-weight: 400;
  justify-content: start;
  flex: 1;
  flex-basis: 0%;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const HeadlineAndReviews = styled.h2`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  align-self: stretch;
  flex: 1;
  width: 100%;
  gap: 8px;
  color: #1d1b20;
  letter-spacing: 0px;
  font-size: 22px;
  line-height: 28px;
  font-family: Roboto, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SupportingText = styled.div`
  display: flex;
  margin-top: 8px;
  width: 100%;
  flex-direction: column;
  color: #49454f;
  letter-spacing: 0.25px;
  font-size: 14px;
  line-height: 20px;
  font-family: Roboto, sans-serif;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Description = styled.p`
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const DividerWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 0 16px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Divider = styled.hr`
  background: #cac4d0;
  min-height: 1px;
  width: 100%;
  border: 1px solid rgba(202, 196, 208, 1);

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const GoalContainer = styled.div`
  margin-top: 16px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const GoalInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
`;

const GoalButton = styled.button`
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

export default ProfileOptions;
