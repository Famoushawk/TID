import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import CommentSection from './CommentSection';
import MessageInput from './MessageInput';


const ContentContainer = styled.div`
  border-radius: 28px;
  background: var(--Schemes-Surface-Container-Lowest, #fff);
  display: flex;
  margin-top: 16px;
  min-height: 652px;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

function Content() {
  return (
        <ContentContainer>
          <Header />
          <CommentSection />
          <MessageInput />
        </ContentContainer>
  );
}

export default Content;