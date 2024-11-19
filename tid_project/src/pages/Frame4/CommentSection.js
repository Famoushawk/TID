import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import { useThread } from './ThreadContext';
import { CommentService } from '../../api/services/CommentService';
import { formatTimeAgo } from '../../components/utils/dateUtils';

const CommentSectionWrapper = styled.section`
  width: 100%;
`;

const SectionHeader = styled.h3`
  padding: 18px 16px;
  color: #49454f;
  letter-spacing: 0.1px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
`;

const CommentList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

function CommentSection() {
  const { selectedThread, commentsUpdated } = useThread();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!selectedThread?.objectId) return;

      try {
        const results = await CommentService.getComments(selectedThread.objectId);
        const formattedComments = results.map(comment => ({
          id: comment.objectId,
          name: comment.author,
          content: comment.content,
          time: formatTimeAgo(comment.createdAt),
          avatarSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59s6qBOFlkS5LN4Z0U3G71nCWWg3SuHGVMw&s"
        }));
        setComments(formattedComments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
    // Set up polling for new comments
    const pollInterval = setInterval(fetchComments, 5000);
    
    return () => clearInterval(pollInterval);
  }, [selectedThread, commentsUpdated]);

  if (loading) return <div>Loading comments...</div>;

  return (
    <CommentSectionWrapper>
      <SectionHeader>Comments</SectionHeader>
      <CommentList>
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment.id} {...comment} />
          ))
        ) : (
          <li style={{ padding: '16px', textAlign: 'center' }}>
            No comments yet. Be the first to comment!
          </li>
        )}
      </CommentList>
    </CommentSectionWrapper>
  );
}

export default CommentSection;