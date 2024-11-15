import React from 'react';
import styled from 'styled-components';

const MessageInputWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 12px 24px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const AttachmentButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

const AttachmentIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;

const EmojiButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;


const EmojiIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 24px;
`;

const InputContainer = styled.div`
  border-radius: 28px;
  background-color: rgba(200, 228, 209, 1);
  align-self: stretch;
  display: flex;
  min-width: 240px;
  min-height: 56px;
  gap: 4px;
  overflow: hidden;
  justify-content: flex-start;
  flex: 1;
  flex-basis: 0%;
  margin: auto 0;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const InputContent = styled.div`
  display: flex;
  min-width: 240px;
  width: 100%;
  align-items: center;
  gap: 4px;
  justify-content: flex-start;
  flex-wrap: wrap;
  height: 100%;
  flex: 1;
  flex-basis: 0%;
  padding: 15px;
  @media (max-width: 991px) {
    max-width: 100%;
  }
`;


const Input = styled.input`
  border: none;
  background: transparent;
  padding: 8px;
  border-radius: 4px;
  flex: 1;
  min-width: 0;
  font: var(--Body-Large-Size, 16px) / var(--Body-Large-Line-Height, 24px) var(--Body-Large-Font, Roboto);
  &:focus {
    outline: none; 
  }
`;

const SendButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
  }
`;

const SendIcon = styled.img`
  aspect-ratio: 1;
  background: transparent;
  object-fit: contain;
  object-position: center;
  width: 24px;
  margin: auto 12px;
`;

function MessageInput() {
  return (
    <MessageInputWrapper>
        <AttachmentButton>
      <AttachmentIcon loading="lazy" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgEkTbBopWwSwlBnlxZLfkMSrEnYTb-XIgwg&s" alt="Attachment" />
        </AttachmentButton>
        <EmojiButton>
      <EmojiIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0094756c7a1b89cb8ed3b9b7109e31ca3ca9c796ee5e71c0b901133ad3e65a6?placeholderIfAbsent=true&apiKey=d8134f90761a4e9db589863aef8c0d7c" alt="Emoji" />
      </EmojiButton>
      <InputContainer>
        <InputContent>
          <Input type="text" placeholder="Type a message" />
          <SendButton>
          <SendIcon loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1b797fdc359c41babb7c6074ac6705d5d7878fa23423471e457139b8a2c651b?placeholderIfAbsent=true&apiKey=d8134f90761a4e9db589863aef8c0d7c" alt="Send" />
            </SendButton>
        </InputContent>
      </InputContainer>
    </MessageInputWrapper>
  );
}

export default MessageInput;