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
  border-radius: 100px;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  overflow: hidden;
  color: var(--M3-sys-light-on-surface-variant, var(--Schemes-On-Surface-Variant, #49454f));
  white-space: nowrap;
  letter-spacing: var(--Title-Small-Tracking, 0.1px);
  justify-content: flex-start;
  padding: 18px 16px;
  font: 500 var(--Title-Small-Size, 14px) / var(--Title-Small-Line-Height, 20px) var(--Title-Small-Font, Roboto);
  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
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

  const fetchComments = async () => {
    if (!selectedThread) {
      setComments([]);
      setLoading(false);
      return;
    }

    try {
      const results = await CommentService.getComments(selectedThread.id);
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
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [selectedThread, commentsUpdated]);

  if (loading) return <div>Loading comments...</div>;

  return (
    <CommentSectionWrapper>
      <SectionHeader>Comments</SectionHeader>
      <CommentList>
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem
              key={comment.id}
              {...comment}
            />
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