import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  border-radius: 12px;
  display: flex;
  max-width: 100%;
  flex-direction: column;
  overflow: hidden;
`;

const HeaderContent = styled.div`
  display: flex;
  height: 138px;
  align-items: center;
  justify-content: flex-start;
`;

const HeaderInner = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  width: 100%;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  padding: 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const ProfileImage = styled.img`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--M3-sys-light-surface, var(--Schemes-Surface, #fef7ff));
  white-space: nowrap;
  text-align: center;
  letter-spacing: var(--Title-Medium-Tracking, 0.15px);
  width: 40px;
  margin: auto 0;
  font: 500 var(--Title-Medium-Size, 16px) / var(--Title-Medium-Line-Height, 24px) var(--Title-Medium-Font, Roboto);
  @media (max-width: 991px) {
    white-space: initial;
  }
`;


const TextContent = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  color: var(--M3-sys-light-on-surface, var(--Schemes-On-Surface, #1d1b20));
  justify-content: flex-start;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Title = styled.h2`
  letter-spacing: var(--Title-Medium-Tracking, 0.15px);
  font: 500 var(--Title-Medium-Size, 16px) / var(--Title-Medium-Line-Height, 24px) var(--Title-Medium-Font, Roboto);
  margin: 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const Subtitle = styled.p`
  letter-spacing: var(--Body-Medium-Tracking, 0.25px);
  margin-top: 4px;
  font: 400 var(--Body-Medium-Size, 14px) / var(--Body-Medium-Line-Height, 20px) var(--Body-Medium-Font, Roboto);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

function Header() {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderInner>
          <ProfileImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59s6qBOFlkS5LN4Z0U3G71nCWWg3SuHGVMw&s"
        alt="Profile picture" />
          <TextContent>
            <Title>Subject</Title>
            <Subtitle>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Subtitle>
          </TextContent>
        </HeaderInner>
      </HeaderContent>
    </HeaderWrapper>
  );
}

export default Header;