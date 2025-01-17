import React, { useState } from 'react';
import styled from 'styled-components';
import { useThread } from '../ThreadContext';
import Header from '../Header';
import CommentSection from '../components/CommentList';
import MessageInput from '../components/CommentForm';
import ThreadCard from '../ThreadCard';
import NewThreadDialog from '../NewThreadDialog';
import AddButton from '../../../components/layout/AddButton';
import { ThreadService } from '../../../api/services/ThreadService';

const ContentContainer = styled.div`
  border-radius: 28px;
  background: var(--Schemes-Surface-Container-Lowest, #fff);
  display: flex;
  margin-top: 16px;
  min-height: 652px;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
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
  const [isNewThreadDialogOpen, setIsNewThreadDialogOpen] = useState(false);

  const handleThreadClick = async (thread) => {
    try {
      const response = await ThreadService.getThread(thread.objectId);
      setSelectedThread(response);
    } catch (error) {
      console.error('Error fetching thread:', error);
    }
  };

  // Override the AddButton's default navigation behavior
  const handleAddClick = (e) => {
    e.preventDefault();
    setIsNewThreadDialogOpen(true);
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
                key={thread.objectId}
                thread={thread}
                onClick={() => handleThreadClick(thread)}
              />
            ))}
          </ThreadList>
          <AddButton onClick={handleAddClick} />
          <NewThreadDialog 
            isOpen={isNewThreadDialogOpen}
            onClose={() => setIsNewThreadDialogOpen(false)}
          />
        </>
      )}
    </ContentContainer>
  );
};

export default Content;