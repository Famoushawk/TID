import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { useThread } from './ThreadContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: black;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NewThreadDialog = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { createThread } = useThread();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await createThread(title, content);
      setTitle('');
      setContent('');
      onClose();
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Thread</DialogTitle>
        </DialogHeader>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Thread Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Thread Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <Button type="submit">Create Thread</Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewThreadDialog;