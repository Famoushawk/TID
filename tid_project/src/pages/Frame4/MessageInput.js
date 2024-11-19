import React, { useState } from 'react';
import styled from 'styled-components';
import { useThread } from './ThreadContext';

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
`;

const Form = styled.form`
  width: 100%;
  display: flex;
`;

const Input = styled.input`
  border: none;
  background: transparent;
  padding: 8px 16px;
  width: 100%;
  font-size: 16px;
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
  margin: 0 12px;
  &:hover {
    opacity: 0.8;
  }
`;

function MessageInput() {
  const [message, setMessage] = useState('');
  const { selectedThread, createComment } = useThread();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedThread || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createComment(selectedThread.id, message.trim());
      setMessage(''); // Clearer input after successful submission
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MessageInputWrapper>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
          />
          <SendButton type="submit" disabled={isSubmitting}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c1b797fdc359c41babb7c6074ac6705d5d7878fa23423471e457139b8a2c651b"
              alt="Send"
              style={{ width: '24px' }}
            />
          </SendButton>
        </InputContainer>
      </Form>
    </MessageInputWrapper>
  );
}

export default MessageInput;