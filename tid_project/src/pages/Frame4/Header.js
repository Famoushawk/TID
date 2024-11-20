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

function Header({ title = "Subject", content }) {
  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderInner>
          <TextContent>
            <Title>{title}</Title>
            {content && <Subtitle>{content}</Subtitle>}
          </TextContent>
        </HeaderInner>
      </HeaderContent>
    </HeaderWrapper>
  );
}

export default Header;