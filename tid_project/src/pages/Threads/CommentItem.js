import React from 'react';
import styled from 'styled-components';
import { formatTimeAgo } from '../../components/utils/dateUtils';

const CommentItemWrapper = styled.li`
  border-radius: 16px 16px 0px 0px;
  position: relative;
  display: flex;
  min-height: 72px;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const CommentContent = styled.div`
  z-index: 0;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
  flex: 1;
  flex-wrap: wrap;
  height: 100%;
  padding: 8px 16px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const AvatarWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: auto 0;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;

const TextContent = styled.div`
  align-self: stretch;
  display: flex;
  min-width: 240px;
  flex-direction: column;
  overflow: hidden;
  font-weight: 400;
  white-space: nowrap;
  justify-content: center;
  flex: 1;
  flex-basis: 0%;
  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`;

const Name = styled.div`
  color: var(--M3-sys-light-on-surface, var(--Schemes-On-Surface, #1d1b20));
  letter-spacing: var(--Body-Large-Tracking, 0.5px);
  font: var(--Body-Large-Size, 16px) / var(--Body-Large-Line-Height, 24px) var(--Body-Large-Font, Roboto);
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const CommentText = styled.div`
  color: var(--M3-sys-light-on-surface-variant, var(--Schemes-On-Surface-Variant, #49454f));
  text-overflow: ellipsis;
  letter-spacing: var(--Body-Medium-Tracking, 0.25px);
  font: var(--Body-Medium-Size, 14px) / var(--Body-Medium-Line-Height, 20px) var(--Body-Medium-Font, Roboto);
  @media (max-width: 991px) {
    max-width: 100%;
    white-space: initial;
  }
`;

const Time = styled.div`
  color: var(--M3-sys-light-on-surface-variant, var(--Schemes-On-Surface-Variant, #49454f));
  text-align: right;
  letter-spacing: var(--Label-Small-Tracking, 0.5px);
  align-self: stretch;
  margin: auto 0;
  font: 500 var(--Label-Small-Size, 11px) / var(--Label-Small-Line-Height, 16px) var(--Label-Small-Font, Roboto);
`;

function CommentItem({ name, content, time, avatarSrc }) {
  const defaultAvatar = "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png";

  const handleImageError = (e) => {
    e.target.src = defaultAvatar;
  };

  return (
    <CommentItemWrapper>
      <CommentContent>
        <AvatarWrapper>
          <Avatar 
            src={avatarSrc || defaultAvatar} 
            alt={`${name}'s avatar`}
            onError={handleImageError}
          />
        </AvatarWrapper>
        <TextContent>
          <Name>{name}</Name>
          <CommentText>{content}</CommentText>
        </TextContent>
        <Time>{time}</Time>
      </CommentContent>
    </CommentItemWrapper>
  );
}

export default CommentItem;