import React from 'react';
import styled from 'styled-components';
import { formatDateTime } from '../../components/utils/dateUtils';

const Card = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray50};
  }
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  color: ${({ theme }) => theme.colors.gray900};
`;

const Content = styled.p`
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.gray700};
`;

const MetadataContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.gray500};
`;

const AuthorInfo = styled.span`
  display: flex;
  align-items: center;
`;

const CommentCount = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const ThreadCard = ({ thread, onClick }) => {
    const authorName = thread.author?.username || thread.authorName || 'Anonymous';
  return (
    <Card onClick={onClick}>
      <Title>{thread.title}</Title>
      <Content>{thread.content}</Content>
      <MetadataContainer>
      <AuthorInfo>
      Posted by {authorName} • {formatDateTime(thread.createdAt)}
    </AuthorInfo>
        <CommentCount>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {thread.commentCount} {thread.commentCount === 1 ? 'comment' : 'comments'}
        </CommentCount>
      </MetadataContainer>
    </Card>
  );
};

export default ThreadCard;