
import React from "react";
import styled from "styled-components";

const ProfileOptions = ({ title, description, imageUrl }) => {
  return (
    <ListOptions>
      <StateLayer>
        <LeadingElement>
          <ImageWrapper>
            <Icon src={imageUrl} alt="" />
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
    </ListOptions>
  );
};

const ListOptions = styled.li`
  display: flex;
  min-height: 88px;
  width: 100%;
  flex-direction: column;
  justify-content: start;
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
  color: var(--M3-sys-light-on-surface, var(--Schemes-On-Surface, #1d1b20));
  letter-spacing: var(--Title-Large-Tracking, 0px);
  font: var(--Title-Large-Size, 22px) / var(--Title-Large-Line-Height, 28px) var(--Title-Large-Font, Roboto);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const SupportingText = styled.div`
  display: flex;
  margin-top: 8px;
  width: 100%;
  flex-direction: column;
  color: var(
    --M3-sys-light-on-surface-variant,
    var(--Schemes-On-Surface-Variant, #49454f)
  );
  letter-spacing: var(--Body-Medium-Tracking, 0.25px);
  justify-content: start;
  font: var(--Body-Medium-Size, 14px) / var(--Body-Medium-Line-Height, 20px) var(--Body-Medium-Font, Roboto);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Details = styled.p`
  align-self: stretch;
  flex: 1;
  width: 100%;
  gap: 4px;
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
  transform: rotate(8.742277657347563e-8rad);
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
  background: var(--Schemes-Outline-Variant, #cac4d0);
  min-height: 1px;
  width: 100%;
  border: 1px solid rgba(202, 196, 208, 1);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

export default ProfileOptions;



