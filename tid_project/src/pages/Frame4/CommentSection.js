import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';

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

// Comments shouldn't be hardcoded 
// Find way to import comments and profiles
const commentData = [
  {
    id: 1,
    name: "Name",
    content: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    time: "10 min",
    avatarSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59s6qBOFlkS5LN4Z0U3G71nCWWg3SuHGVMw&s"
  },
  {
    id: 2,
    name: "Name",
    content: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    time: "10 min",
    avatarSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59s6qBOFlkS5LN4Z0U3G71nCWWg3SuHGVMw&s"
  },
  {
    id: 3,
    name: "Name",
    content: "Supporting line text lorem ipsum dolor sit amet, consectetur.",
    time: "10 min",
    avatarSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS59s6qBOFlkS5LN4Z0U3G71nCWWg3SuHGVMw&s"
  }
];

function CommentSection() {
  return (
    <CommentSectionWrapper>
      <SectionHeader>Comments</SectionHeader>
      <CommentList>
        {commentData.map(comment => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </CommentList>
    </CommentSectionWrapper>
  );
}

export default CommentSection;