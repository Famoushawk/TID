import React from 'react';
import styled from 'styled-components';
import { useThread } from './ThreadContext';
import Header from './Header';
import CommentSection from './CommentSection';
import MessageInput from './MessageInput';
import { ThreadService } from '../../api/services/ThreadService';

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

const ThreadList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[4]};
`;

const ThreadCard = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray50};
  }
`;

const BackButton = styled.button`
  margin: 16px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Content = () => {
  const { threads, selectedThread, setSelectedThread } = useThread();

  const handleThreadClick = async (thread) => {
    try {
      const response = await ThreadService.getThread(thread.objectId);
      setSelectedThread(response);
    } catch (error) {
      console.error('Error fetching thread:', error);
    }
  };

  return (
    <ContentContainer>
      {selectedThread ? (
        <>
          <BackButton onClick={() => setSelectedThread(null)}>
            Back to Threads
          </BackButton>
          <Header 
            title={selectedThread.title}
            content={selectedThread.content}
          />
          <CommentSection />
          <MessageInput />
        </>
      ) : (
        <>
          <Header title="Discussion Forum" />
          <ThreadList>
            {threads.map((thread) => (
              <ThreadCard 
                key={thread.id} 
                onClick={() => handleThreadClick(thread)}
              >
                <h3>{thread.title}</h3>
                <p>{thread.content}</p>
                <small>
                  Posted by {thread.author?.username} on{' '}
                  {new Date(thread.createdAt).toLocaleDateString()}
                </small>
              </ThreadCard>
            ))}
          </ThreadList>
        </>
      )}
    </ContentContainer>
  );
};

export default Content;