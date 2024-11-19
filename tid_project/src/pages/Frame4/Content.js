import React from 'react';
import styled from 'styled-components';
import { useThread } from './ThreadContext';
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

function Content() {
  const { threads, loading, error, selectedThread, setSelectedThread } = useThread();

  console.log('Content component state:', { threads, loading, error }); // Debug log

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
  };

  console.log('Threads loaded:', threads?.length);

  return (
    <ContentContainer>
      {selectedThread ? (
        <>
          <BackButton onClick={() => setSelectedThread(null)}>
            Back to Threads
          </BackButton>
          <Header 
            title={selectedThread.get('title')}
            content={selectedThread.get('content')}
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
                <h3>{thread.get('title')}</h3>
                <p>{thread.get('content')}</p>
                <small>
                  Posted by {thread.get('author')?.get('username')} on{' '}
                  {new Date(thread.get('createdAt')).toLocaleDateString()}
                </small>
              </ThreadCard>
            ))}
          </ThreadList>
        </>
      )}
    </ContentContainer>
  );
}

export default Content;